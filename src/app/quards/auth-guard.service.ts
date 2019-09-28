import { UserService } from 'src/app/service/user.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('userToken') != null) {

          let roles = next.data["roles"] as Array<string>;
          if (roles) {
            let match = this.userService.roleMatch(roles);
            if (match) { return true; }
            else {
              this.router.navigate(['/forbidden']);
              return false;
            }
          }
            else {
              return true;
            }
          }

      this.router.navigate(['/login']);
      return false;
      }

    }

