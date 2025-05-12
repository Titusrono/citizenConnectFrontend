import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:3000/report'; // ✅ URL of your NestJS endpoint

  constructor(private http: HttpClient) { }

  // ✅ Function to submit report
  submitReport(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // ✅ Function to get all reports
  getReports(): Observable<any> {
    return this.http.get(this.apiUrl);  // This fetches all reports
  }

  // ✅ Function to delete a specific report by ID
  deleteReport(reportId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reportId}`);  // This deletes a report by ID
  }
}
