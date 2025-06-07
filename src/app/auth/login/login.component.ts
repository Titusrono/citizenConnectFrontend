import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    this.errorMessage = null;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        // Alert success (optional)
        window.alert('✅ Login successful!');

        // Get user role after login
        const role = this.authService.getRole();

        // Redirect based on role
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['/portal']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || '❌ Login failed. Please try again.';
      },
    });
  }

  loginWithGoogle() {
    window.location.href = `${this.authService.googleAuthUrl}`;
  }
}
