import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionRepresentaion } from '../models/question-representation';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  
  private baseUrl = 'http://localhost:3000/api/Question';

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

  getQuestionsByHeading(headingId: string): Observable<Array<QuestionRepresentaion>> {
    const questionsUrl = `${this.baseUrl}/Heading/${headingId}`;
    const headers = this.getHeaders();
    return this.http.get<Array<QuestionRepresentaion>>(questionsUrl, { headers });
  }

  getQuestionsBySection(sectionId: string): Observable<Array<QuestionRepresentaion>> {
    const questionsUrl = `${this.baseUrl}/Section/${sectionId}`;
    const headers = this.getHeaders();
    return this.http.get<Array<QuestionRepresentaion>>(questionsUrl, { headers });
  }

  getQuestionById(questionID: string): Observable<QuestionRepresentaion> {
    const questionsUrl = `${this.baseUrl}/${questionID}`;
    const headers = this.getHeaders();
    return this.http.get<QuestionRepresentaion>(questionsUrl, { headers });
  }

  createQuestion(question: any): Observable<Array<QuestionRepresentaion>> {
    const questionsUrl = `${this.baseUrl}`;
    const headers = this.getHeaders();
    return this.http.post<Array<QuestionRepresentaion>>(questionsUrl, question, { headers });
  }

  updateQuestion(questionID: string, updatedQuestion: any): Observable<Array<QuestionRepresentaion>> {
    const questionsUrl = `${this.baseUrl}/${questionID}`;
    const headers = this.getHeaders();
    return this.http.put<Array<QuestionRepresentaion>>(questionsUrl, updatedQuestion, { headers });
  }

  deleteQuestion(questionID: string): Observable<void> {
    const questionsUrl = `${this.baseUrl}/${questionID}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(questionsUrl, { headers });
  }
}
