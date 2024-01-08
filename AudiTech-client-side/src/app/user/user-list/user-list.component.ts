import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user/user.service';
import { UserRepresentaion } from '../../services/api/models/user-representaion';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserRepresentaion[] = [];
  defaultImageSrc: string = '../../../assets/svg/denied.png';

  constructor(
    private userService: UserService,
    public sharedService: SharedService // Inject SharedService here
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUserImageUrl(fileName: string): string {
    return fileName
      ? 'http://localhost:3000/uploads/' + fileName
      : this.defaultImageSrc;
  }

  handleImageError(event: any, user: any): void {
    event.target.src = this.defaultImageSrc;
  }
}
