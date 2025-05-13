import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateVoteCreateDto {
  title: string;
  description: string;
  endDate: string;
  eligibility?: string;
}

@Injectable({
  providedIn: 'root',
})
export class VoteCreateService {
  // Directly using localhost for the API URL
  private apiUrl = 'http://localhost:3000/votecreates'; // Replace with your local backend URL

  constructor(private http: HttpClient) {}

  // Create a new voting proposal
  createVote(createVotecreateDto: CreateVoteCreateDto): Observable<any> {
    return this.http.post(this.apiUrl, createVotecreateDto);
  }

  // Get all voting proposals
  getAllVotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get a single voting proposal by ID
  getVoteById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Update a voting proposal
  updateVote(id: string, updateVotecreateDto: CreateVoteCreateDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updateVotecreateDto);
  }

  // Delete a voting proposal by ID
  deleteVote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
