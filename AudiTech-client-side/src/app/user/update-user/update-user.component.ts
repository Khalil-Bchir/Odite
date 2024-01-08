import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm!: FormGroup;
  userId!: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute  ) {}

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    if (userIdParam !== null) {
      this.userId = userIdParam;
    }
    this.updateUserForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.updateUserForm.patchValue({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          file: user.file
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateUser(): void {
    if (this.updateUserForm.valid) {
      const updatedUserData = this.updateUserForm.value;

      this.userService.updateUser(this.userId, updatedUserData).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          // Refresh the current page
          window.location.reload();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }


}
