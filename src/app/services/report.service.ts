import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:3000/report'; // ✅ NestJS endpoint

  constructor(private http: HttpClient) {}

  // ✅ Submit report with JWT in headers
  submitReport(formData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token'); // Must match TOKEN_KEY in AuthService

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }

  // ✅ Get all reports (public)
  getReports(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // ✅ Delete a report
  deleteReport(reportId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reportId}`);
  }
}
