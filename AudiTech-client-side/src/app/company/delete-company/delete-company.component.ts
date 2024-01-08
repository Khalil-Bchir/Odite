import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/api/company/company.service';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrl: './delete-company.component.css'
})
export class DeleteCompanyComponent {

  companyID: string | null = null;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      // Retrieve the companyID from the route parameters
      this.companyID = params.get('id');
    });
  }

  deleteCompany(): void {
    if (this.companyID !== null) {
      this.companyService.deleteCompany(this.companyID!).subscribe(
        (response: any) => {
          console.log('Company deleted successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Company ID is null');
    }
  }

}
