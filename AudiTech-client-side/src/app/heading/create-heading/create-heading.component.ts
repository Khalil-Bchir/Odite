import { Component, EventEmitter, Output } from '@angular/core';
import { HeadingService } from '../../services/api/heading/heading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-heading',
  templateUrl: './create-heading.component.html',
  styleUrl: './create-heading.component.css'
})
export class CreateHeadingComponent {

  heading: any = {
    headingID: '',
    title: '',
    requireSections: false,
  };
  errorMessage: string = '';
  createdHeadingId: string = '';
  // Event emitter for notifying the parent component
  @Output() headingCreated = new EventEmitter<any>();
  showSectionForm!: boolean;

  constructor(
    private headingService: HeadingService,
    private router: Router
  ) {}

    createHeading(): void {
      this.headingService.createHeading(this.heading).subscribe(
        (response: any) => { // Update the type of 'response' to 'any'
          console.log(response);
          this.createdHeadingId = response.headingID;
          // Emit the headingCreated event with the created heading data
          this.headingCreated.emit({ headingID: this.createdHeadingId, title: this.heading.title });
          window.location.reload();
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Failed to create heading. Please check your inputs and try again.';
        }
      );
    }

  // Handle the heading creation event
  onHeadingCreated(headingData: any): void {
    this.heading = headingData; // Set the heading data
    // If requireSections is true, show the section creation form
    if (this.heading.requireSections) {
      this.showSectionForm = true;
    }
  }
  }
