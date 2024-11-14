import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; // Importing the necessary RxJS operators

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/userroute'; // Change to your backend URL
  private tokenKey = 'token'; // Key used to store token in localStorage

  constructor(private http: HttpClient, private router: Router) { }

  // Register a new user
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Log in an existing user
  login(user: User): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token); // Store the token
        this.router.navigate(['/home']); // Navigate to the home page after successful login
      }),
      catchError(err => {
        console.error('Login error:', err); // Log any login errors
        return throwError(err);
      })
    );
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove the token from storage
    this.router.navigate(['/login']); // Navigate to login page after logout
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Returns true if token exists
  }

  // Get the authentication token for API requests
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Optional: Decode the JWT token (if you want to check for expiration)
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

  // Optional: Check if token is expired (JWT-specific)
  isTokenExpired(): boolean {
    const token = this.getDecodedToken();
    if (!token || !token.exp) {
      return true;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(token.exp);
    return expirationDate < new Date();
  }
}
