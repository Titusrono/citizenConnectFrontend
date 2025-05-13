import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vote-create.component.html',
})
export class VoteCreateComponent implements OnInit {
  proposal = {
    title: '',
    description: '',
    eligibility: '',
    endDate: ''
  };

  proposals: any[] = [];
  successMessage = '';
  editingProposal: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProposals();
  }

  createProposal() {
    this.http.post('http://localhost:3000/votecreate', this.proposal).subscribe({
      next: () => {
        this.successMessage = 'Proposal created successfully!';
        this.proposal = {
          title: '',
          description: '',
          eligibility: '',
          endDate: ''
        };
        this.fetchProposals();
      },
      error: (err) => {
        console.error('Error creating proposal:', err);
        this.successMessage = 'Failed to create proposal. Try again.';
      }
    });
  }

  fetchProposals() {
    this.http.get<any[]>('http://localhost:3000/votecreate').subscribe({
      next: (data) => {
        this.proposals = data;
      },
      error: (err) => {
        console.error('Error fetching proposals:', err);
      }
    });
  }

  editProposal(proposal: any) {
    // Make a copy so we don’t edit directly until user confirms
    this.editingProposal = { ...proposal };
  }

  updateProposal() {
    const id = this.editingProposal._id;

    this.http.patch(`http://localhost:3000/votecreate/${id}`, this.editingProposal).subscribe({
      next: () => {
        this.successMessage = 'Proposal updated successfully!';
        this.editingProposal = null;
        this.fetchProposals();
      },
      error: (err) => {
        console.error('Error updating proposal:', err);
        this.successMessage = 'Failed to update proposal.';
      }
    });
  }

  deleteProposal(id: string) {
    if (!confirm('Are you sure you want to delete this proposal?')) return;

    this.http.delete(`http://localhost:3000/votecreate/${id}`).subscribe({
      next: () => {
        this.successMessage = 'Proposal deleted successfully!';
        this.fetchProposals();
      },
      error: (err) => {
        console.error('Error deleting proposal:', err);
        this.successMessage = 'Failed to delete proposal.';
      }
    });
  }
}
