import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadingService } from '../../services/api/heading/heading.service';

@Component({
  selector: 'app-delete-heading',
  templateUrl: './delete-heading.component.html',
  styleUrl: './delete-heading.component.css'
})
export class DeleteHeadingComponent {

  headingId: string | null = null;

  constructor(
    private headingService: HeadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      // Retrieve the headingId from the route parameters
      this.headingId = params.get('id');
    });
  }

  deleteHeading(): void {
    if (this.headingId !== null) {
      this.headingService.deleteHeading(this.headingId!).subscribe(
        (response: any) => {
          console.log('Heading deleted successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Heading ID is null');
    }
  }



}
