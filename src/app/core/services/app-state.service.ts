import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();

  private _theme = signal<'light' | 'dark'>('light');
  theme = this._theme.asReadonly();

  login(user: User) {
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
  }

  toggleTheme() {
    this._theme.set(this._theme() === 'light' ? 'dark' : 'light');
  }
}
