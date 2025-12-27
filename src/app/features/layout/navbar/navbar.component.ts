// src/app/layout/navbar/navbar.component.ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private router = inject(Router);
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/']);
  }

  readonly topics = [
    { path: 'components', label: 'Components' },
    { path: 'services', label: 'Services & DI' },
    { path: 'routing', label: 'Routing' },
    { path: 'interceptors', label: 'HTTP Interceptors' },
    { path: 'forms', label: 'Forms' },
    { path: 'rxjs', label: 'RxJS' },
    { path: 'directives', label: 'Directives & Pipes' },
    { path: 'ai', label: 'AI Tools in Development'},
    { path: 'guards', label: 'Guards & Auth' },
    { path: 'signals', label: 'Signals & State' },
    { path: 'testing', label: 'Testing' },
    { path: 'advanced', label: 'Advanced Topics' },
  ];
}
