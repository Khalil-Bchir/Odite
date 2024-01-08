import { Component } from '@angular/core';
import { CompanyService } from '../../services/api/company/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {

  company: any = {
    companyName: '',
    email: '',
    phone: '',
    address: '',
    numberOfEmployees: '',
    legalRepresentative: '',
    activityArea: '',
  };
  errorMessage: string = '';

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) {}

  createCompany(): void {
    this.companyService.createCompany(this.company).subscribe(
      (response: any) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to create company. Please check your inputs and try again.';
      }
    );
  }



}
