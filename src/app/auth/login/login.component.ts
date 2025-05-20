import { Component, Inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    private router: Router
  ) {}

  onLogin() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.loginService.login(this.loginDto).subscribe(
      (response: { token: string, role?: string }) => {
        this.loading = false;
        console.log('Login successful', response);

        // Store token in localStorage
        this.loginService.storeToken(response.token);

        // Optionally, store role separately (if returned)
        if (response.role) {
          localStorage.setItem('userRole', response.role);
        } else {
          // Decode role from token if not directly returned
          const role = this.decodeRoleFromToken(response.token);
          if (role) {
            localStorage.setItem('userRole', role);
          }
        }

        this.successMessage = 'Login successful! Redirecting...';

        // Redirect based on role
        setTimeout(() => {
          const role = localStorage.getItem('userRole');
          if (role === 'admin') {
            this.router.navigate(['/dashboard']); // Adjust admin route
          } else {
            this.router.navigate(['/portal']);  // Adjust user route
          }
        }, 2000);
      },
      (error: { error: { message: string } }) => {
        this.loading = false;
        console.error('Login failed', error);
        this.errorMessage = error?.error?.message || 'An error occurred during login. Please try again.';
      }
    );
  }

  // Decode JWT token to extract role
  private decodeRoleFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }
}
