import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRoles: string[] = route.data['roles'] || [];

    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (user && expectedRoles.includes(user.role)) {
          return true;
        }
        // Redirect to unauthorized page
        return this.router.createUrlTree(['/unauthorized']);
      }),
      catchError(() => {
        // In case of error (e.g. no user), redirect to unauthorized
        return of(this.router.createUrlTree(['/unauthorized']));
      })
    );
  }
}
