import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  private apiUrl = 'http://localhost:3000/petitions'; // Your backend API URL

  constructor(private http: HttpClient) { }

  // Fetch all petitions
  getAllPetitions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Update petition by ID
  updatePetition(id: string, updateData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, updateData);
  }

  // Delete petition by ID
  deletePetition(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Approve a petition (optional extra logic)
  approvePetition(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approve/${id}`, {});
  }
}
