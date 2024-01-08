// section-list.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../../services/api/section/section.service';
import { SectionRepresentaion } from '../../services/api/models/section-representation';
import { SharedService } from '../../services/shared/shared.service';  // Import the SharedService

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent {

}
