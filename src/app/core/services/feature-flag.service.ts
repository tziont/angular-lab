import { Injectable } from '@angular/core';
import { IFeatureFlag, FeatureKey } from '../../types/feature-flag.model';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap, Subject, startWith, switchMap,map, distinctUntilChanged } from 'rxjs';

// DTO types
export type CreateFeatureFlagDto = Omit<IFeatureFlag, '_id' | 'createdAt'>;
export type UpdateFeatureFlagDto = Partial<Omit<IFeatureFlag, '_id' | 'createdAt'>>;

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private readonly apiUrl = 'https://localhost:3001/feature-flags';

  // Trigger to refresh the list reactively
  private refresh$ = new Subject<void>();

  // Fully typed observable, automatically refreshes
  flags$: Observable<IFeatureFlag[]> = this.refresh$.pipe(
    startWith(void 0), // initial load
    switchMap(() => this.http.get<IFeatureFlag[]>(this.apiUrl).pipe(
      tap(data => console.log('Backend data:', data))
    )),
    
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}


  /** Create a new flag and trigger refresh automatically */
  create(flag: CreateFeatureFlagDto): Observable<IFeatureFlag> {
    return this.http
      .post<IFeatureFlag>(this.apiUrl, flag)
      .pipe(tap(() => this.refresh$.next()));
  }

  /** Update a flag and trigger refresh automatically */
  update(id: string, changes: UpdateFeatureFlagDto): Observable<IFeatureFlag> {
    return this.http
      .put<IFeatureFlag>(`${this.apiUrl}/${id}`, changes)
      .pipe(tap(() => this.refresh$.next()));
  }

  /** Delete a flag and trigger refresh automatically */
  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.refresh$.next()));
  }

  /**
   * Returns an observable of a specific flag's status.
   * Uses distinctUntilChanged so the UI only re-renders if the flag actually flips.
   */
  isEnabled(key: FeatureKey): Observable<boolean> {
    return this.flags$.pipe(
      map(flags => !!flags.find(f => f.key === key)?.enabled),
      distinctUntilChanged()
    );
  }
}
