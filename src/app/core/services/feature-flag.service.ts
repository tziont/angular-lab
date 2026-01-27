import { Injectable } from '@angular/core';
import { IFeatureFlag } from '../../types/feature-flag.model';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private readonly apiUrl = 'http://localhost:3000/feature-flags';
  private flags$?: Observable<IFeatureFlag[]> | null;
  constructor(private http: HttpClient) {}

  getAll(forceRefresh: boolean = false): Observable<IFeatureFlag[]> {
    if (!this.flags$ || forceRefresh) {
      this.flags$ = this.http
        .get<IFeatureFlag[]>(this.apiUrl)
        .pipe(shareReplay(1));
    }
    return this.flags$;
  }

  create(flag: IFeatureFlag): Observable<IFeatureFlag> {
    return this.http
      .post<IFeatureFlag>(this.apiUrl, flag)
      .pipe(tap(() => this.invalidateCache()));
  }

  update(id: string, changes: Partial<IFeatureFlag>): Observable<IFeatureFlag> {
    return this.http
      .put<IFeatureFlag>(`${this.apiUrl}/${id}`, changes)
      .pipe(tap(() => this.invalidateCache()));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.invalidateCache()));
  }

  invalidateCache(): void {
    this.flags$ = undefined;
  }
}
