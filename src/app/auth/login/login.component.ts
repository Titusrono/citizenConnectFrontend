import { Component, Inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
//import { AuthService } from '../../services/auth.service';  // <-- Import AuthService
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink]
})
export class LoginComponent {
  loginDto: any = {
    email: '',
    password: ''
  };
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    @Inject(LoginService) private loginService: LoginService,
    private authService: AuthService,           // <-- Inject AuthService
    private router: Router
  ) {}

  onLogin() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.loginService.login(this.loginDto).subscribe(
      (response: { token: string; role?: string }) => {
        this.loading = false;

        if (!response || !response.token) {
          this.errorMessage = 'Invalid response from server.';
          return;
        }

        // Decode role from token if not provided
        let role = response.role;
        if (!role) {
          role = this.decodeRoleFromToken(response.token) || undefined;
        }

        // Store token & role using AuthService
        this.authService.login(response.token, role);

        this.successMessage = 'Login successful! Redirecting...';

        // Redirect immediately based on role
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['/portal']);
        } else {
          this.router.navigate(['/']); // fallback route
        }
      },
      (error: any) => {
        this.loading = false;
        console.error('Login failed:', error);
        this.errorMessage = error?.error?.message || 'An error occurred during login. Please try again.';
      }
    );
  }

  // Decode JWT to extract role
  private decodeRoleFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role || null;
    } catch (e) {
      console.error('Token decode failed:', e);
      return null;
    }
  }
}
