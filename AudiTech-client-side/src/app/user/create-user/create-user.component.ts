// create-user.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: any = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    userType: 'AD',
    file: null
  };
  errorMessage: string = ''; // Variable to store error messages

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to create user. Please check your inputs and try again.';
      }
    );
  }

  // Handle file input changes and update the 'user' object
  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      // Assign the file name to the 'user' object
      this.user.file = files[0];
    }
  }
}
