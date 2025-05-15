import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  county: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  createUser(arg0: { name: any; email: any; password: any; county: any; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/register'; // your NestJS controller path

  constructor(private http: HttpClient) {}

  // Create/Register new user
  registerUser(userData: RegisterUserData): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Get all users
  getUsers(): Observable<RegisterUserData[]> {
    return this.http.get<RegisterUserData[]>(this.apiUrl);
  }

  // Update user by email (assuming email is unique identifier)
  updateUser(email: string, userData: Partial<RegisterUserData>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${email}`, userData);
  }

  // Delete user by email
  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${email}`);
  }

  // Example login method placeholder (you can implement it properly later)
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/login', credentials);
  }
}
