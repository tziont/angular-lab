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
  errorMessage!: string

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
      this.authService.saveToken(response.token);
      this.authService.saveUser(response.user); // <-- now storing the user
      this.errorMessage = '';
      console.log('Login successful');
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('Login failed:', err);
      this.errorMessage = 'Login failed';
    },
  });
}

}
