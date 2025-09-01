import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../types/user.model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly BASE_URL = 'http://localhost:3001'; // Express backend port

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, credentials);
  }
}
