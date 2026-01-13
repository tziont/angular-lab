import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, shareReplay, map } from 'rxjs';
import { Settings, Setting, SettingDto } from '../../types/setting.model';

@Injectable({
  providedIn: 'root',
})
export class SettingTaskService {
  private settings$?: Observable<Settings> |null;

  baseUrl = 'https://localhost:3001/settings';
  constructor(private http: HttpClient) {}


  getSettings(): Observable<Settings> {

    if (!this.settings$) {
      console.log('Fetching settings from server...');
    this.settings$ = this.http.get<Settings>(this.baseUrl, { withCredentials: true }).pipe(shareReplay(1));
    }
    return this.settings$;
  }

saveSettings(settings: Setting[]): Observable<Setting[]> {
  this.settings$ = null; // Invalidate the cached settings
  console.log('Saving setting:', settings);
  return this.http.put<Setting[]>(
    `${this.baseUrl}`,
    settings,
    { withCredentials: true }
  );
}


}
