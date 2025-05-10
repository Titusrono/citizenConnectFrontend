import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { PetitionService } from '../../services/petition.service'; // ✅ Correct path

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, // ✅ Make it standalone
  imports: [CommonModule], // ✅ Import CommonModule
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  petitions: any[] = [];
  loading = false;
successMessage: any;

  constructor(private petitionService: PetitionService) { }

  ngOnInit() {
    this.fetchPetitions();
  }

  fetchPetitions() {
    this.loading = true;
    this.petitionService.getAllPetitions().subscribe({
      next: (response: any) => {
        this.petitions = response;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  approvePetition(id: string) {
    this.petitionService.approvePetition(id).subscribe({
      next: () => {
        alert('Petition Approved!');
        this.fetchPetitions();
      },
      error: (error: any) => {
        console.error(error);
        alert('Approval failed!');
      }
    });
  }

  deletePetition(id: string) {
    this.petitionService.deletePetition(id).subscribe({
      next: () => {
        alert('Petition Deleted!');
        this.fetchPetitions();
      },
      error: (error: any) => {
        console.error(error);
        alert('Delete failed!');
      }
    });
  }
}
