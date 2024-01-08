import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  userId: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      // Retrieve the userId from the route parameters
      this.userId = params.get('id');
    });
  }

  deleteUser(): void {
    if (this.userId !== null) {
      this.userService.deleteUser(this.userId!).subscribe(
        (response: any) => {
          console.log('User deleted successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }

}

