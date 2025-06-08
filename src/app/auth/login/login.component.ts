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
  email = '';
  password = '';
  errorMessage: string | null = null;
  loading = false;

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
    this.loading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        window.alert('✅ Login successful!');

        const role = this.authService.getRole();

        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);  // <-- Fixed here
        } else if (role === 'user') {
          this.router.navigate(['/portal']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || '❌ Login failed. Please try again.';
      },
    });
  }

  loginWithGoogle() {
    this.authService.googleLogin();
  }
}
