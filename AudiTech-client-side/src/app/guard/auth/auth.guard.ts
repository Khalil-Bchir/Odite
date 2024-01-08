// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth/auth.service';
import { Inject } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private sharedService: SharedService,
    private router: Router,
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = this.authService.getToken();
    console.log('Token in SadAuthGuard:', token);

    if (token && !this.jwtHelper.isTokenExpired(token)) {

      const userType = this.jwtHelper.decodeToken(token).userType;
      console.log('User Type in SadAuthGuard:', userType);
      this.sharedService.setUserType(userType); // Remove the argument from this line

      const userID = this.jwtHelper.decodeToken(token).id;
      console.log('User ID in SadAuthGuard:', userID);
      this.sharedService.setUserID(userID);

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
