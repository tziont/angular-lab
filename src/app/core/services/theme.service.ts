import { Injectable, signal } from '@angular/core'
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme = signal<'light' | 'dark'>('light');

  currentTheme = this.theme.asReadonly();

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    document.body.classList.toggle('light-theme', newTheme === 'light');
  }
}