import { Component } from '@angular/core';
import { AuthService } from '../../services/api/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
    // Redirect or perform any other action upon logout
    window.location.reload();

  }
}
