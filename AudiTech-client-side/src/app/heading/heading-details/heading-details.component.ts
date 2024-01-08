import { Component, Inject, OnInit } from '@angular/core';
import { HeadingRepresentaion } from '../../services/api/models/heading-representation';
import { HeadingService } from '../../services/api/heading/heading.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';


@Component({
  selector: 'app-heading-details',
  templateUrl: './heading-details.component.html',
  styleUrl: './heading-details.component.css'
})
export class HeadingDetailsComponent implements OnInit {
  heading: HeadingRepresentaion = {} as HeadingRepresentaion;
  questionID!: string | null;


  constructor(
    private headingService: HeadingService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    public sharedService: SharedService  // Inject the SharedService
  ) {}

  ngOnInit(): void {


    this.loadHeadingProfile();
  }

  loadHeadingProfile(): void {
    const headingId = String(this.route.snapshot.paramMap.get('id'));

    // Set the headingID in the SharedService
    this.sharedService.setHeadingSectionID(headingId);

    this.headingService.getHeadingById(headingId).subscribe(
      (heading) => {
        this.heading = heading;
        console.log(this.heading);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
