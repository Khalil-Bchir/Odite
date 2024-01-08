import { Component, Inject } from '@angular/core';
import { CompanyRepresentaion } from '../../services/api/models/company-representaion';
import { CompanyService } from '../../services/api/company/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent {

  company: CompanyRepresentaion = {} as CompanyRepresentaion;

  constructor(
    private companyService: CompanyService,
    @Inject(ActivatedRoute) private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCompanyProfile();
  }

  loadCompanyProfile(): void {
    const companyId = String(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompanyById(companyId).subscribe(
      (company) => {
        this.company = company;
        console.log(this.company);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
