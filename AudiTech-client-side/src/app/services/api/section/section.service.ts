import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SectionRepresentaion } from '../models/section-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private baseUrl = 'http://localhost:3000/api/Section';

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<Array<SectionRepresentaion>> {
    const sectionUrl = `${this.baseUrl}`;
    return this.http.get<Array<SectionRepresentaion>>(sectionUrl);
  }

  getSectionsByHeading(headingId: string): Observable<Array<SectionRepresentaion>> {
    const headingSectionsUrl = `${this.baseUrl}/Heading/${headingId}`;
    return this.http.get<Array<SectionRepresentaion>>(headingSectionsUrl);
  }

  getSectionById(sectionId: string): Observable<SectionRepresentaion> {
    const sectionUrl = `${this.baseUrl}/${sectionId}`;
    return this.http.get<SectionRepresentaion>(sectionUrl);
  }

  createSection(section: any): Observable<Array<SectionRepresentaion>> {
    const sectionUrl = `${this.baseUrl}`;
    return this.http.post<Array<SectionRepresentaion>>(sectionUrl, section);
  }

  updateSection(sectionId: string, updatedSection: any): Observable<SectionRepresentaion> {
    const sectionUrl = `${this.baseUrl}/${sectionId}`;
    return this.http.put<SectionRepresentaion>(sectionUrl, updatedSection);
  }

  deleteSection(sectionId: string): Observable<void> {
    const sectionUrl = `${this.baseUrl}/${sectionId}`;
    return this.http.delete<void>(sectionUrl);
  }
}
