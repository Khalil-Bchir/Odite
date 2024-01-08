import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeadingService } from '../../services/api/heading/heading.service';
import { SharedService } from '../../services/shared/shared.service';


@Component({
  selector: 'app-update-heading',
  templateUrl: './update-heading.component.html',
  styleUrls: ['./update-heading.component.css']
})
export class UpdateHeadingComponent implements OnInit {
  updateHeadingForm!: FormGroup;
  headingId!: string;

  constructor(
    private headingService: HeadingService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public sharedService: SharedService // Inject SharedService here
  ) {}

  ngOnInit(): void {
    const headingIdParam = this.route.snapshot.paramMap.get('id');
    if (headingIdParam !== null) {
      this.headingId = headingIdParam;
    }

    this.updateHeadingForm = this.fb.group({
      title: ['', Validators.required],
      requireSections: [false]
    });


    this.loadHeadingData();
  }

  loadHeadingData(): void {
    this.headingService.getHeadingById(this.headingId).subscribe(
      (heading) => {
        this.updateHeadingForm.patchValue({
          title: heading.title,
          requireSections: heading.requireSections
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateHeading(): void {
    if (this.updateHeadingForm.valid) {
      const updatedHeadingData = {
        title: this.updateHeadingForm.value.title,
        requireSections: this.updateHeadingForm.value.requireSections
      };

      this.headingService.updateHeading(this.headingId, updatedHeadingData).subscribe(
        (response) => {
          console.log('Heading updated successfully:', response);
          // Redirect to the heading details page or navigate as needed
          window.location.reload();
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    }
  }
}
