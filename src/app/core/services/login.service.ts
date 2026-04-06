import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../types/user.model';
import { AuthService } from './auth.service'; // Import your "Brain" service

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
 private readonly http = inject(HttpClient);
 private readonly auth = inject(AuthService); // Inject it here
 private readonly BASE_URL = 'https://localhost:3001';





login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.BASE_URL}/login`, 
      credentials, 
      { withCredentials: true }
    ).pipe(
      tap(response => {
        // [CRITICAL]: Push the user into the AuthService stream!
        // This is what makes the Feature Flags wake up.
        this.auth.saveUser(response.user); 
      })
    );
  }


}
