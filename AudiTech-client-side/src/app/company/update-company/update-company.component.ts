import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from '../../services/api/company/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.css'
})
export class UpdateCompanyComponent {

  updateCompanyForm!: FormGroup;
  companyId!: string;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const companyIdParam = this.route.snapshot.paramMap.get('id');
    if (companyIdParam !== null) {
      this.companyId = companyIdParam;
    }

    this.updateCompanyForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      numberOfEmployees: [''],
      legalRepresentative: [''],
      activityArea: [''],

    });

    this.loadCompanyData();
  }

  loadCompanyData(): void {
    this.companyService.getCompanyById(this.companyId).subscribe(
      (company) => {
        this.updateCompanyForm.patchValue({
          name: company.companyName,
          email: company.email,
          phone: company.phone,
          address: company.address,
          numberOfEmployees: company.numberOfEmployees,
          legalRepresentative: company.legalRepresentative,
          activityArea: company.activityArea,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCompany(): void {
    if (this.updateCompanyForm.valid) {
      const updatedCompanyData = {
        name: this.updateCompanyForm.value.name,
        email: this.updateCompanyForm.value.email,
        phone: this.updateCompanyForm.value.phone,
        address: this.updateCompanyForm.value.address,
        numberOfEmployees: this.updateCompanyForm.value.numberOfEmployees,
        legalRepresentative: this.updateCompanyForm.value.legalRepresentative,
        activityArea: this.updateCompanyForm.value.activityArea,
      };

      this.companyService.updateCompany(this.companyId, updatedCompanyData).subscribe(
        (response) => {
          console.log('Company updated successfully:', response);
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }


}
