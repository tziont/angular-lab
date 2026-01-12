import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';

  init() {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    this.setTheme(saved ?? 'light');
  }

  setTheme(theme: Theme) {
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem(this.storageKey, theme);
  }

  toggle() {
    const current =
      document.documentElement.dataset['theme'] === 'dark'
        ? 'light'
        : 'dark';

    this.setTheme(current);
  }
}
