import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Adjust to your backend URL

  // User role as BehaviorSubject for reactive updates
  private currentUserRole = new BehaviorSubject<string | null>(null);

  // Authenticated state observable
  private authState = new BehaviorSubject<boolean>(false);
  public authState$ = this.authState.asObservable();

  // Store token expiration timeout ID for clearing on logout
  private tokenExpiryTimeoutId: any;

  googleAuthUrl = `${this.apiUrl}/google`; // Google OAuth URL

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // On browser load, check for valid token and update auth state and role
      const valid = this.hasValidToken();
      this.authState.next(valid);

      if (valid) {
        const role = this.getUserRole();
        this.currentUserRole.next(role);

        // Setup auto logout timer based on token expiry
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

  /**
   * Register new user
   */
  register(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials)
      // Optionally add catchError here to handle registration errors
      ;
  }

  /**
   * Login user and set token
   */
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        this.setToken(res.access_token);
      }),
      // Uncomment below to handle login errors explicitly
      // catchError(err => {
      //   console.error('Login failed', err);
      //   return throwError(() => new Error('Login failed'));
      // })
    );
  }

  /**
   * Update password after login
   */
  updatePassword(data: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-password`, data);
  }

  /**
   * Reset password with token
   */
  resetPassword(data: { token: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  /**
   * Get current user info from backend
   */
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  /**
   * Initiate Google OAuth login redirect
   */
  googleLogin(): void {
    window.location.href = this.googleAuthUrl;
  }

  /**
   * Logout user and clear stored data
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
    this.currentUserRole.next(null);
    this.authState.next(false);
    this.clearTokenExpiryTimeout();
    this.router.navigate(['/']);
  }

  /**
   * Observable to check if user is logged in
   */
  isLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

  /**
   * Get stored token from localStorage
   */
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('access_token');
  }

  /**
   * Save token, update role and auth state, and set expiry timeout
   */
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
    const decoded = this.decodeToken(token);
    this.currentUserRole.next(decoded?.role ?? null);
    this.authState.next(true);

    // Setup auto logout timer
    if (decoded?.exp) {
      this.setTokenExpiryTimeout(decoded.exp);
    }
  }

  /**
   * Get cached user role from BehaviorSubject
   */
  getRole(): string | null {
    return this.currentUserRole.value;
  }

  /**
   * Extract user role from decoded token (reads from localStorage token)
   */
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    return this.decodeToken(token)?.role ?? null;
  }

  /**
   * Observable for user role changes
   */
  getRoleStream(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  /**
   * Decode JWT token payload safely
   */
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  /**
   * Check if token exists and is not expired
   */
  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  /**
   * Setup timeout to auto logout user when token expires
   */
  private setTokenExpiryTimeout(expiryUnix: number): void {
    const now = Math.floor(Date.now() / 1000);
    const expiresInMs = (expiryUnix - now) * 1000;

    if (expiresInMs <= 0) {
      this.logout();
      return;
    }

    this.clearTokenExpiryTimeout(); // clear any existing timers

    this.tokenExpiryTimeoutId = setTimeout(() => {
      this.logout();
    }, expiresInMs);
  }

  /**
   * Clear any existing token expiry timeout
   */
  private clearTokenExpiryTimeout(): void {
    if (this.tokenExpiryTimeoutId) {
      clearTimeout(this.tokenExpiryTimeoutId);
      this.tokenExpiryTimeoutId = null;
    }
  }
}

/**
 * OPTIONAL: HTTP Interceptor example to add token to requests
 * Create a separate file auth.interceptor.ts and provide in your app.module.ts
 *
 * import { Injectable } from '@angular/core';
 * import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
 * import { Observable } from 'rxjs';
 *
 * @Injectable()
 * export class AuthInterceptor implements HttpInterceptor {
 *   constructor(private authService: AuthService) {}
 *
 *   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 *     const token = this.authService.getToken();
 *     if (token) {
 *       req = req.clone({
 *         setHeaders: {
 *           Authorization: `Bearer ${token}`,
 *         },
 *       });
 *     }
 *     return next.handle(req);
 *   }
 * }
 */

