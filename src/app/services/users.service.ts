import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; // ✅ Add this field
  county: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loginUser(arg0: { email: string; password: string; }) {
    throw new Error('Method not implemented.');
  }
  // ✅ This should match the NestJS controller path: @Controller('register')
  private apiUrl = 'http://localhost:3000/register';

  constructor(private http: HttpClient) {}

  // ✅ Now sends all required fields including confirmPassword
  registerUser(userData: RegisterUserData): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
