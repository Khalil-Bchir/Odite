// sad-auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedService } from '../../services/shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class SadAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private sharedService: SharedService,
    ) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    console.log('Token in SadAuthGuard:', token);

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const userType = this.jwtHelper.decodeToken(token).userType;
      console.log('User Type in SadAuthGuard:', userType);
      this.sharedService.setUserType(userType); // Remove the argument from this line

      const userID = this.jwtHelper.decodeToken(token).id;
      console.log('User ID in SadAuthGuard:', userID);
      this.sharedService.setUserID(userID);

      if (userType === 'SAD') {
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }

}
