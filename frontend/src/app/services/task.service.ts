import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';  // The backend URL to fetch tasks

  constructor(private http: HttpClient) {}

  // Get all tasks from the backend
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
