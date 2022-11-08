import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user-service";

@Injectable()
export class ClientGuard implements CanActivate {

  constructor(private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isAuthenticated = false;
    this.userService.isAuthenticated().toPromise().then(result => isAuthenticated = result ?? false);
    return isAuthenticated;
  }
}
