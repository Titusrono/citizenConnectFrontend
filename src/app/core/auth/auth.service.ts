import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private apiUrl = 'http://localhost:3000/auth'; // Update to your backend URL

  // BehaviorSubject to track current user role reactively
  private currentUserRole = new BehaviorSubject<string | null>(null);

  // BehaviorSubject to track authentication state reactively
  private authState = new BehaviorSubject<boolean>(false);
  public authState$ = this.authState.asObservable();

  // Store token expiry timeout ID so it can be cleared on logout
  private tokenExpiryTimeoutId: any;

  googleAuthUrl = `${this.apiUrl}/google`; // Google OAuth URL

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // On app load in browser, check token validity and update auth state & role
      const valid = this.hasValidToken();
      this.authState.next(valid);

      if (valid) {
        const role = this.getUserRole();
        this.currentUserRole.next(role);

        // Setup auto logout timer based on token expiry time
        const token = this.getToken();
        if (token) {
          const decoded = this.decodeToken(token);
          if (decoded?.exp) {
            this.setTokenExpiryTimeout(decoded.exp);
          }
        }
      }
    }
  }

  /** Register a new user */
  register(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  /** Login user and save token */
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => this.setToken(res.access_token))
    );
  }

  /** Update password after login */
  updatePassword(data: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-password`, data);
  }

  /** Reset password with token */
  resetPassword(data: { token: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  /** Get current logged-in user info */
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  /** Initiate Google OAuth login by redirecting browser */
  googleLogin(): void {
    window.location.href = this.googleAuthUrl;
  }

  /** Logout user, clear token and auth state */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.currentUserRole.next(null);
    this.authState.next(false);
    this.clearTokenExpiryTimeout();
    this.router.navigate(['/']);
  }

  /** Observable for login status */
  isLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

  /** Get token from localStorage */
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Save token, update role & auth state, and set token expiry auto-logout */
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    const decoded = this.decodeToken(token);
    this.currentUserRole.next(decoded?.role ?? null);
    this.authState.next(true);
    if (decoded?.exp) {
      this.setTokenExpiryTimeout(decoded.exp);
    }
  }

  /** Get current user role synchronously */
  getRole(): string | null {
    return this.currentUserRole.value;
  }

  /** Extract user role from decoded token */
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decodeToken(token)?.role ?? null;
  }

  /** Observable stream for user role changes */
  getRoleStream(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  /** Decode JWT token payload safely */
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  /** Check if a valid (not expired) token exists */
  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  /** Setup auto logout timer based on token expiry */
  private setTokenExpiryTimeout(expiryUnix: number): void {
    const now = Math.floor(Date.now() / 1000);
    const expiresInMs = (expiryUnix - now) * 1000;

    if (expiresInMs <= 0) {
      this.logout();
      return;
    }

    this.clearTokenExpiryTimeout();

    this.tokenExpiryTimeoutId = setTimeout(() => {
      this.logout();
    }, expiresInMs);
  }

  /** Clear any existing token expiry timeout */
  private clearTokenExpiryTimeout(): void {
    if (this.tokenExpiryTimeoutId) {
      clearTimeout(this.tokenExpiryTimeoutId);
      this.tokenExpiryTimeoutId = null;
    }
  }
}
