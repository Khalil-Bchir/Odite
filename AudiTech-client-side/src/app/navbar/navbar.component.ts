import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, public sharedService: SharedService) {}

  goBack(): void {
    const userType = this.sharedService.getUserType();

    // Check user type and navigate accordingly
    if (userType === 'SAD') {
      this.router.navigate(['./admin']);
    } else {
      this.router.navigate(['./dashboard']);
    }
  }
}
