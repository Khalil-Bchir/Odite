// auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sharedService: SharedService,
    ) {}

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };

    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response: any) => {
        // Store the token in local storage with a specific key, e.g., 'auth_token'
        localStorage.setItem('token', response.token);
        console.log('Received Token from login:', response.token);
      }),
      catchError((error) => {
        console.error('Error logging in:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    // Retrieve the token from local storage with the key 'token'
    const token = localStorage.getItem('token');
    console.log('Token from getToken:', token);
    return token;
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  getUserType(): string | null {
    const token = this.getToken();

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', payload);
        // Set the user type in the shared service
        const userType = payload?.['userType'] || null;
        return userType;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }

    return null;
  }
}
