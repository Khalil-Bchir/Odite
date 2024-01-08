import { Component, Inject } from '@angular/core';
import { UserRepresentaion } from '../../services/api/models/user-representaion';
import { UserService } from '../../services/api/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {

  user: UserRepresentaion = {} as UserRepresentaion;
  defaultImageSrc: string = '../../../assets/svg/profile.png';

  constructor(
    private userService: UserService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private sharedService: SharedService,
    ) {}


  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Get userId from SharedService
    const userId = this.sharedService.getUserID();
    console.log("userId from the profile details", userId);
    
    // Ensure userId is available before making the request
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          console.log(this.user);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('User ID not available in SharedService');
    }
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
