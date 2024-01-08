import { Component } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(public  sharedService: SharedService) {}

}
