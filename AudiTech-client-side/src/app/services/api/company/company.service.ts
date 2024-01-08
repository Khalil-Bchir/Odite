import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyRepresentaion } from '../models/company-representaion';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  private baseUrl = 'http://localhost:3000/api/CompanySheet';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    // Check if token is available
    if (token) {
      // Attach the token to the Authorization header
      return new HttpHeaders().set('Authorization', `${token}`);
    } else {
      // If no token, return headers without Authorization
      return new HttpHeaders();
    }
  }

  getAllCompanies(): Observable<Array<CompanyRepresentaion>> {
    const companyUrl = `${this.baseUrl}`;
    const headers = this.getHeaders();
    return this.http.get<Array<CompanyRepresentaion>>(companyUrl, { headers });
  }

  getCompanyById(companyID: string): Observable<CompanyRepresentaion> {
    const companyUrl = `${this.baseUrl}/${companyID}`;
    const headers = this.getHeaders();
    return this.http.get<CompanyRepresentaion>(companyUrl, { headers });
  }

  createCompany(company: any): Observable<Array<CompanyRepresentaion>> {
    const companyUrl = `${this.baseUrl}`;
    const headers = this.getHeaders();
    return this.http.post<Array<CompanyRepresentaion>>(companyUrl, company, { headers });
  }

  updateCompany(companyID: string, updatedCompany: any): Observable<Array<CompanyRepresentaion>> {
    const companyUrl = `${this.baseUrl}/${companyID}`;
    const headers = this.getHeaders();
    return this.http.put<Array<CompanyRepresentaion>>(companyUrl, updatedCompany, { headers });
  }

  deleteCompany(companyID: string): Observable<void> {
    const companyUrl = `${this.baseUrl}/${companyID}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(companyUrl, { headers });
  }
}
