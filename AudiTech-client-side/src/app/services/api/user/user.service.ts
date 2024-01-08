// user.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepresentaion } from '../models/user-representaion';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/user';

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

  getAllUsers(): Observable<Array<UserRepresentaion>> {
    const headers = this.getHeaders();
    const userUrl = `${this.baseUrl}`;
    return this.http.get<Array<UserRepresentaion>>(userUrl, { headers });
  }

  getUserById(userId: string): Observable<UserRepresentaion> {
    const headers = this.getHeaders();
    const userUrl = `${this.baseUrl}/${userId}`;
    return this.http.get<UserRepresentaion>(userUrl, { headers });
  }

  createUser(user: any): Observable<Array<UserRepresentaion>> {
    const headers = this.getHeaders();

    const formData: FormData = new FormData();

    // Append user data to the form data
    formData.append('name', user.name);
    formData.append('lastname', user.lastname);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('userType', user.userType);

    // Append the file to the form data
    formData.append('file', user.file);

    // Make the POST request with form data
    return this.http.post<Array<UserRepresentaion>>(this.baseUrl, formData, { headers });
  }

  updateUser(userId: string, updatedUser: any): Observable<Array<UserRepresentaion>> {
    const headers = this.getHeaders();
    const userUrl = `${this.baseUrl}/${userId}`;
    return this.http.put<Array<UserRepresentaion>>(userUrl, updatedUser, { headers });
  }

  updateProfileImage(userId: string, file: File): Observable<Array<UserRepresentaion>> {
    const headers = this.getHeaders();

    const formData: FormData = new FormData();
    formData.append('file', file);

    const userUrl = `${this.baseUrl}/${userId}/image`;
    return this.http.put<Array<UserRepresentaion>>(userUrl, formData, { headers });
  }

  deleteUser(userId: string): Observable<void> {
    const headers = this.getHeaders();
    const userUrl = `${this.baseUrl}/${userId}`;
    return this.http.delete<void>(userUrl, { headers });
  }
}
