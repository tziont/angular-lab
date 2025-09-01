// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../../types/user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly refreshTokenKey = 'refreshToken'; // ✅ new
  private readonly userKey = 'user';
  private readonly API_URL = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  // --- token + refresh token methods ---
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  // --- user methods ---
  saveUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  // --- logout ---
  logout(): void {
    this.removeToken();
    this.removeRefreshToken(); // ✅ new
    this.removeUser();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // --- refresh token API call ---
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.API_URL}/token`, { token: refreshToken }).pipe(
      tap((res: any) => {
        this.saveToken(res.accessToken);
      })
    );
  }
}
