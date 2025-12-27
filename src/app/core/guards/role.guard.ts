import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const user = this.authService.getUser(); // Assume AuthService stores current user

    if (user && route.data['roles']?.includes(user.role)) {
      console.log('Auth guard running');
      return true; // ✅ Allowed
    }

    // ❌ Not allowed → redirect to forbidden page or home
    return this.router.parseUrl('/home/advanced/forbidden');
  }
}


