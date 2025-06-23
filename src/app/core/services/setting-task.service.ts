import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings, Setting } from '../../types/setting.model';

@Injectable({
  providedIn: 'root',
})
export class SettingTaskService {
  constructor(private http: HttpClient) {}

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>('http://localhost:3000/settings');
  }

  saveSettings(setting:Setting):Observable<Settings>{
    console.log("This mother fucker is DIRTY: ",setting)
    return this.http.put<Settings>(`http://localhost:3000/settings/${setting.id}`, setting);
  }
}
