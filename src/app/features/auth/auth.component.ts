import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { LoginService, LoginRequest } from '../../core/services/login.service';
import { SignupService } from '../../core/services/signup.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  activeTab: 'login' | 'signup' = 'login';
  loginErrorMessage = '';
  signupErrorMessage = '';
  showPasswordError = false;
  isLoading = false; // UX/Performance addition

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private signupService: SignupService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('LoginComponent initialized');

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.signupForm.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.showPasswordError = !!this.signupForm.errors?.['passwordMismatch'];
    });

    this.signupForm.get('username')?.valueChanges.subscribe(() => {
      if (this.signupForm.get('username')?.hasError('usernameTaken')) {
        this.signupForm.get('username')?.setErrors(null);
      }
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return (password && confirmPassword && password !== confirmPassword) ? { passwordMismatch: true } : null;
  }

  switchTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
    this.signupErrorMessage = '';
    this.loginErrorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) return;
    this.isLoading = true;

    const credentials: LoginRequest = this.loginForm.value;

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        console.log('STEP 3: login next() fired');
        console.log('STEP 3: response.user =', response.user);
        this.authService.saveUser(response.user);
        
        console.log('Attempting to navigate to /home');
        this.router.navigate(['/home']).then(success => {
          console.log('Navigation success?', success);
        }).catch(err => {
          console.error('Navigation error:', err);
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed:', err);
        this.loginErrorMessage = 'Login failed';
      },
    });
  }

  onSignup(): void {
    if (this.signupForm.invalid || this.isLoading) {
      if (this.signupForm.errors?.['passwordMismatch']) {
        this.signupErrorMessage = 'Passwords do not match';
      }
      return;
    }
    this.isLoading = true;

    this.signupService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.switchTab('login');
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 409) {
          this.signupForm.get('username')?.setErrors({ usernameTaken: true });
        } else {
          this.signupErrorMessage = 'Signup failed';
        }
      },
    });
  }
}