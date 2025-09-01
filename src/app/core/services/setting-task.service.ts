import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings, Setting } from '../../types/setting.model';

@Injectable({
  providedIn: 'root',
})
export class SettingTaskService {

  baseUrl = 'http://localhost:3001/settings';
  constructor(private http: HttpClient) {}

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.baseUrl);
  }

  saveSettings(setting:Setting):Observable<Settings>{
    return this.http.put<Settings>(`${this.baseUrl}/${setting.id}`, setting);
  }
}
