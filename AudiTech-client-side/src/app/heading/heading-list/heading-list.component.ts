// heading-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HeadingService } from '../../services/api/heading/heading.service';
import { HeadingRepresentaion } from '../../services/api/models/heading-representation';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-heading-list',
  templateUrl: './heading-list.component.html',
  styleUrls: ['./heading-list.component.css']
})
export class HeadingListComponent implements OnInit {
  headings: HeadingRepresentaion[] = [];
  headingId!: string;

  constructor(private headingService: HeadingService,public sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadHeadings();
  }

  loadHeadings(): void {
    this.headingService.getAllHeadings().subscribe(
      (headings) => {
        this.headings = headings;
        console.log(this.headings);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
