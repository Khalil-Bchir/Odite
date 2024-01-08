// audit.service

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuditRepresentaion } from '../models/audit-representation';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private baseUrl = 'http://localhost:3000/api/Audit';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

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

  createAudit(audit: any): Observable<Array<AuditRepresentaion>> {
    const headers = this.getHeaders();
    const auditUrl = `${this.baseUrl}`;
    return this.http.post<Array<AuditRepresentaion>>(auditUrl, audit, { headers });
  }

  getAuditsByUser(userId: string): Observable<Array<AuditRepresentaion>> {
    const headers = this.getHeaders();
    const auditUrl = `${this.baseUrl}/User/${userId}`;
    return this.http.get<Array<AuditRepresentaion>>(auditUrl, { headers });
  }

  getAllAudits(): Observable<Array<AuditRepresentaion>> {
    const headers = this.getHeaders();
    const auditUrl = `${this.baseUrl}`;
    return this.http.get<Array<AuditRepresentaion>>(auditUrl, { headers });
  }

  getAuditById(auditId: string): Observable<Array<AuditRepresentaion>> {
    const headers = this.getHeaders();
    const auditUrl = `${this.baseUrl}/${auditId}`;
    return this.http.get<Array<AuditRepresentaion>>(auditUrl, { headers });
  }

  updateAudit(auditId: string, updatedAudit: any): Observable<Array<AuditRepresentaion>> {
    const headers = this.getHeaders();
    const auditUrl = `${this.baseUrl}/${auditId}`;
    return this.http.put<Array<AuditRepresentaion>>(auditUrl, updatedAudit, { headers });
  }

  deleteAudit(auditId: string): Observable<void> {
    const headers = this.getHeaders();
    const auditUrl = `${this.baseUrl}/${auditId}`;
    return this.http.delete<void>(auditUrl, { headers });
  }
}
