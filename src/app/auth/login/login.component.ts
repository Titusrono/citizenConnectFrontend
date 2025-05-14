import { Component, Inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
//import { LoginService } from '../services/login.service'; // Adjust the path as necessary
//import { CreateLoginDto } from '../dto/create-login.dto'; // Adjust the path as necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected to 'styleUrls'
})
export class LoginComponent {
  loginDto: any = {
    email: '',
    password: ''
  };
  loading: boolean = false; // For handling loading state
  errorMessage: string = ''; // To show error message
  successMessage: string = ''; // To show success message

  constructor(@Inject(LoginService) private loginService: LoginService) {}
  // Handle login form submission
  onLogin() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Call the login service method and handle the response
    this.loginService.login(this.loginDto).subscribe(
      (response: { token: any; }) => {
        this.loading = false;
        console.log('Login successful', response);

        // Assuming response contains a JWT token, store it in localStorage
        this.loginService.storeToken(response.token); // Store the token if available
        this.successMessage = 'Login successful! Redirecting...';

        // Optionally, redirect after success
        setTimeout(() => {
          // Redirect logic here (e.g., navigate to the dashboard)
        }, 2000); // Redirect after 2 seconds
      },
      (error: { error: { message: string; }; }) => {
        this.loading = false;
        console.error('Login failed', error);
        // Show error message to user
        this.errorMessage = error?.error?.message || 'An error occurred during login. Please try again.';
      }
    );
  }
}