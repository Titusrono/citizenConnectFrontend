import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment'; // Adjust this import based on your environment setup
//import { CreateLoginDto } from '../dto/create-login.dto'; // Adjust path to DTO if needed

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth/login'; // Hardcoded URL since environment is not available

  constructor(private http: HttpClient) {}

  // Method to login a user
  login(createLoginDto: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, createLoginDto);
  }
  // Method to store the JWT token after login
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Method to get the stored JWT token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Method to remove the JWT token (for logout)
  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }

  // Optionally, check if the user is logged in by verifying if the token exists
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}