import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  // Check if token exists in local storage (initial login state)
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Observable to subscribe to login state changes
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Login: store token and role, then notify observers of login state
  login(token: string, role?: string): void {
    localStorage.setItem('token', token);
    if (role) {
      localStorage.setItem('userRole', role);
    }
    this.loggedIn.next(true);
  }

  // Logout: remove token and role, update login state and redirect
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // Retrieve JWT token for HTTP requests
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Retrieve current user's role
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Helper to check if logged-in user is admin
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // Helper to check if logged-in user is a regular user
  isUser(): boolean {
    return this.getRole() === 'user';
  }
}
