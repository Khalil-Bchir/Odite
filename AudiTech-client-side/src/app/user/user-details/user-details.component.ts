import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user/user.service';
import { UserRepresentaion } from '../../services/api/models/user-representaion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{

  user: UserRepresentaion = {} as UserRepresentaion;
  defaultImageSrc: string = '../../../assets/svg/profile.png';

  constructor(private userService: UserService,  @Inject(ActivatedRoute) private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userId = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);
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
    // Handle the image error, for example, by setting the source to the default image
    event.target.src = this.defaultImageSrc;
    console.error('Error loading image for user:', user);
  }

}
