import { Component } from '@angular/core';
import { CompanyRepresentaion } from '../../services/api/models/company-representaion';
import { CompanyService } from '../../services/api/company/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {

  companies: CompanyRepresentaion[] = [];
  companyId!: string;

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.loadCompanys();
  }

  loadCompanys(): void {
    this.companyService.getAllCompanies().subscribe(
      (companys) => {
        this.companies = companys;
        console.log(this.companies);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
