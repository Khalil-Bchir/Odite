import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  updateUserForm!: FormGroup;
  userId!: string;

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
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.updateUserForm.patchValue({
          password: user.password,
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
          this.router.navigate(['/user-details', this.userId]);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
}
