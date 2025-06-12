import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  private apiUrl = 'http://localhost:3000/petitions'; // Backend API endpoint

  constructor(private http: HttpClient) {}

  // ✅ Create petition with FormData (text + file)
  createPetition(petitionData: {
    title: string;
    description: string;
    targetAuthority?: string;
    supportingDocs?: File;
    createdBy: string;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('title', petitionData.title);
    formData.append('description', petitionData.description);
    
    if (petitionData.targetAuthority) {
      formData.append('targetAuthority', petitionData.targetAuthority);
    }

    if (petitionData.supportingDocs) {
      formData.append('supportingDocs', petitionData.supportingDocs);
    }

    // 🔺 Include createdBy if your backend requires it in the body
    formData.append('createdBy', petitionData.createdBy);

    return this.http.post<any>(this.apiUrl, formData);
  }

  // ✅ Fetch all petitions with user data populated from backend
  getAllPetitions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ Fetch single petition by ID
  getPetitionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Update petition
  updatePetition(id: string, updateData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, updateData);
  }

  // ✅ Delete petition
  deletePetition(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Approve petition (optional)
  approvePetition(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approve/${id}`, {});
  }
}
