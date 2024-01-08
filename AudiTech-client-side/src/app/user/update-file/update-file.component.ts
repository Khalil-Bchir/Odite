import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';

@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.css']
})
export class UpdateFileComponent implements OnInit {
  updateUserForm!: FormGroup;
  userId!: string;
  user: any;  // Declare the 'user' property

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    if (userIdParam !== null) {
      this.userId = userIdParam;
    }
    this.updateUserForm = this.fb.group({
      file: [null]
    });
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.updateUserForm.patchValue({
          File: user.file
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateUser(): void {
    if (this.updateUserForm.valid) {
      const formData = new FormData();
      formData.append('file', this.updateUserForm.get('file')?.value);

      this.userService.updateUser(this.userId, formData).subscribe(
        (response) => {
          console.log('User updated successfully:', response);

          // Update the local user object with the new data from the server
          this.user = { ...this.user, ...response };

          // Refresh the current page
          window.location.reload();
        },
        (error) => {
          console.error('Error updating user:', error);
        });

      // Clear the file input by resetting the form
      this.updateUserForm.reset();
    }
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.updateUserForm.patchValue({
      file: file
    });
    this.updateUserForm.get('file')?.updateValueAndValidity();
  }
}
