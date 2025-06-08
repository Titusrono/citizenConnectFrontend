import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  imports: [CommonModule],
})
export class ProposalComponent implements OnInit {

  proposals: any[] = [];
  voteStatus: { [key: string]: boolean } = {}; // Tracks per-proposal vote status

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProposals();
  }

  fetchProposals() {
    this.http.get<any[]>('http://localhost:3000/votecreate').subscribe({
      next: (data) => this.proposals = data,
      error: (err) => console.error('Error fetching proposals:', err)
    });
  }

  vote(id: string, vote: 'yes' | 'no') {
    // Mark voting in progress
    this.voteStatus[id] = true;

    this.http.post(`http://localhost:3000/votecreate/${id}/vote`, { vote }).subscribe({
      next: () => {
        this.fetchProposals(); // Refresh data to show updated votes
        // Optional: clear status after a short delay
        setTimeout(() => {
          this.voteStatus[id] = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error submitting vote:', err);
        this.voteStatus[id] = false;
      }
    });
  }
}
