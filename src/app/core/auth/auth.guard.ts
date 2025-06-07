import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
    const isAuthenticated = this.authService.isLoggedIn();
    const expectedRoles = route.data['roles'] as string[];
    const userRole = this.authService.getUserRole() || ''; // Handle potential null value

    if (!isAuthenticated) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    if (expectedRoles && !expectedRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']); // Or home page
      return false;
    }

    return true;
  }}
