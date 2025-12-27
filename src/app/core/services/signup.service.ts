
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../types/user.model';

@Injectable({
  providedIn: 'root',
})

export class SignupService {
  private readonly BASE_URL = 'https://localhost:3001'; // Express backend port

  constructor(private http: HttpClient) {}


signup(data: { username: string; password: string }) {
  return this.http.post(`${this.BASE_URL}/signup`, data);
}
}