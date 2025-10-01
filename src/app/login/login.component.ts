import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService, LoginRequest, LoginResponse } from '../core/services/login.service';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

  console.log('LoginComponent initialized');

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

onSubmit(): void {
  if (this.loginForm.invalid) return;

  const credentials: LoginRequest = this.loginForm.value;

  this.loginService.login(credentials).subscribe({
    next: (response) => {
      // Save access token
      this.authService.saveToken(response.accessToken);

      // ✅ Save refresh token
      if (response.refreshToken) {
        this.authService.saveRefreshToken(response.refreshToken);
      }

      // Save user
      this.authService.saveUser(response.user);

      this.errorMessage = '';
      console.log('Login successful');

      // Navigate to default page
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('Login failed:', err);
      this.errorMessage = 'Login failed';
    },
  });
}


}
