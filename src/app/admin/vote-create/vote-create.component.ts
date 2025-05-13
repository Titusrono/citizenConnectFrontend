import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ Required for structural directives
import { FormsModule } from '@angular/forms';   // ✅ Required for ngModel

@Component({
  selector: 'app-vote-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vote-create.component.html',
})
export class VoteCreateComponent {
  proposal = {
    title: '',
    description: '',
    eligibility: '',
    endDate: '' // ✅ Matches the DTO field
  };

  successMessage = '';

  constructor(private http: HttpClient) {}

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
      },
      error: (err) => {
        console.error('Error creating proposal:', err);
        this.successMessage = 'Failed to create proposal. Try again.';
      }
    });
  }
}
