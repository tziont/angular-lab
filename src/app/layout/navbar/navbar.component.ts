// src/app/layout/navbar/navbar.component.ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  readonly topics = [
    { path: '/components', label: 'Components' },
    { path: '/services', label: 'Services & DI' },
    { path: '/routing', label: 'Routing' },
    { path: '/interceptors', label: 'HTTP Interceptors' },
    { path: '/forms', label: 'Forms' },
    { path: '/rxjs', label: 'RxJS' },
    { path: '/directives', label: 'Directives & Pipes' },
    { path: '/guards', label: 'Guards & Auth' },
    { path: '/signals', label: 'Signals & State' },
    { path: '/testing', label: 'Testing' },
    { path: '/advanced', label: 'Advanced Topics' }, // newly added
  ];
}
