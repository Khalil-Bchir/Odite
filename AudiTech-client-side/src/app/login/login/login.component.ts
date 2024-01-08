// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth/auth.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response) {
          // Login successful
          console.log('Login successful');

          // Check the user type and navigate accordingly
          const userType = this.authService.getUserType();

          if (userType !== null) {
            // Set the userType in the shared service
            //this.sharedService.setUserType(userType);
            //console.log('User Type set in Shared Service:', userType);

            if (userType === 'SAD') {
              // If the user is an admin (SAD), navigate to the admin section
              this.router.navigate(['/admin']);
            } else {
              // For other user types, navigate to the dashboard or any other desired route
              this.router.navigate(['/dashboard']);
            }
          } else {
            // Handle the case where userType is null (optional)
            console.error('User Type is null');
          }
        } else {
          // Login failed
          console.log('Login failed');
          // You may display an error message to the user
        }
      },
      (error) => {
        console.error('Error logging in:', error);
        // Handle error, e.g., display an error message
      }
    );
  }
}
