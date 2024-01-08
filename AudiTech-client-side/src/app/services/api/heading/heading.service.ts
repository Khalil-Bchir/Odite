import { Injectable } from '@angular/core';
import { HeadingRepresentaion } from '../models/heading-representation';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HeadingService {

  private baseUrl = 'http://localhost:3000/api/Heading';

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

  getAllHeadings(): Observable<Array<HeadingRepresentaion>> {
    const headingUrl = `${this.baseUrl}`;
    const headers = this.getHeaders();
    return this.http.get<Array<HeadingRepresentaion>>(headingUrl, { headers });
  }

  getHeadingById(headingID: string): Observable<HeadingRepresentaion> {
    const headingUrl = `${this.baseUrl}/${headingID}`;
    const headers = this.getHeaders();
    return this.http.get<HeadingRepresentaion>(headingUrl, { headers });
  }

  createHeading(heading: any): Observable<Array<HeadingRepresentaion>> {
    const headingUrl = `${this.baseUrl}`;
    const headers = this.getHeaders();
    return this.http.post<Array<HeadingRepresentaion>>(headingUrl, heading, { headers });
  }

  updateHeading(headingID: string, updatedHeading: any): Observable<Array<HeadingRepresentaion>> {
    const headingUrl = `${this.baseUrl}/${headingID}`;
    const headers = this.getHeaders();
    return this.http.put<Array<HeadingRepresentaion>>(headingUrl, updatedHeading, { headers });
  }

  deleteHeading(headingID: string): Observable<void> {
    const headingUrl = `${this.baseUrl}/${headingID}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(headingUrl, { headers });
  }
}
