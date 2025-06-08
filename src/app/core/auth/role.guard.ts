import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRoles: string[] = route.data['roles'] || [];

    // Step 1: Try frontend role first
    return this.authService.getRoleStream().pipe(
      take(1),
      switchMap(role => {
        if (role && expectedRoles.includes(role)) {
          return of(true);
        }

        // Step 2: Fallback to backend if role is null or invalid
        return this.authService.getCurrentUser().pipe(
          map(user => {
            if (user && expectedRoles.includes(user.role)) {
              return true;
            }
            return this.router.createUrlTree(['/unauthorized']);
          }),
          catchError(() => of(this.router.createUrlTree(['/unauthorized'])))
        );
      })
    );
  }
}
