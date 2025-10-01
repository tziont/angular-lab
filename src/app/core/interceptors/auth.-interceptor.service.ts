import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, switchMap, catchError, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;

    if (token && req.url.startsWith('http://localhost:3001')) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(authReq).pipe(
      tap(event => console.log('Request sent with token:', authReq.headers.get('Authorization'))),
      catchError((error: HttpErrorResponse) => {
        console.log('Request error status:', error.status);
        // If 401 and refresh token exists
        if (error.status === 401 && this.authService.getRefreshToken()) {
          console.log('401 detected, refreshing token...');
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              const newToken = res.accessToken;
              this.authService.saveToken(newToken); // ✅ save the new token
              console.log('New token received:', newToken);

              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(newReq);
            }),
            catchError((err) => {
              console.log('Refresh failed:', err);
              // Refresh failed → logout
              this.authService.logout();
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
