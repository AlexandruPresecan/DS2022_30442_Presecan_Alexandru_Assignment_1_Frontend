import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { UserService } from "src/services/user-service";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAdminAuthenticated().pipe(
      map(()=> true),
      catchError(() => of(false))
    );
  }
}
