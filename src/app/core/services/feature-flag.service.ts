import { inject, Injectable } from '@angular/core';
import { IFeatureFlag, FeatureKey } from '../../types/feature-flag.model';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  shareReplay,
  tap,
  Subject,
  startWith,
  switchMap,
  map,
  distinctUntilChanged,
  combineLatest,
  of,
} from 'rxjs';
import { AuthService } from './auth.service';
import { Role } from '../../types/roles.model';
import { User } from '../../types/user.model';

export type CreateFeatureFlagDto = Omit<IFeatureFlag, '_id' | 'createdAt'>;
export type UpdateFeatureFlagDto = Partial<
  Omit<IFeatureFlag, '_id' | 'createdAt'>
>;

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private readonly apiUrl = 'https://localhost:3001/feature-flags';

  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private refresh$ = new Subject<void>();

  // This is now "listening" to the login event automatically

  flags$: Observable<IFeatureFlag[]> = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.http
        .get<IFeatureFlag[]>(this.apiUrl)
        .pipe(tap((data) => console.log('Backend data:', data))),
    ),
    shareReplay(1),
  );

  private readonly userRole$: Observable<Role | undefined> =
    this.auth.user$.pipe(
      map((user) => {
        const role = user?.role || this.auth.getUser()?.role;
        console.log('CURRENT ROLE IN STREAM:', role);
        return role;
      }),
      distinctUntilChanged(),
    );

  constructor() {}

  create(flag: CreateFeatureFlagDto): Observable<IFeatureFlag> {
    return this.http
      .post<IFeatureFlag>(this.apiUrl, flag)
      .pipe(tap(() => this.refresh$.next()));
  }

  update(id: string, changes: UpdateFeatureFlagDto): Observable<IFeatureFlag> {
    return this.http
      .put<IFeatureFlag>(`${this.apiUrl}/${id}`, changes)
      .pipe(tap(() => this.refresh$.next()));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.refresh$.next()));
  }

  /**
   * [CORE CHANGE]: Now checks both the 'enabled' boolean AND the 'role' field.
   */
  isEnabled(key: FeatureKey): Observable<boolean> {
    // We combine the flags list with the current user's role stream
    return combineLatest([this.flags$, this.userRole$]).pipe(
      map(([flags, currentUserRole]) => {
        const flag = flags.find((f) => f.key === key);
        const userRoleLower = currentUserRole?.toLowerCase();
        // If flag is missing or off, stop here.
        if (!flag || !flag.enabled) return false;

        // If the flag has NO roles required, it's public.
        if (!flag.allowedRoles || flag.allowedRoles.length === 0) return true;

        const hasAccess = flag.allowedRoles.some(
          (allowedRole) => allowedRole.toLowerCase() === userRoleLower,
        );

        console.log(
          `DEBUG: ${key} | User: ${userRoleLower} | Allowed: ${flag.allowedRoles} | Access: ${hasAccess}`,
        );

        return hasAccess;
      }),
      distinctUntilChanged(),
      tap((result) => console.log(`DEBUG: Final Decision for ${key}:`, result)),
    );
  }
}
