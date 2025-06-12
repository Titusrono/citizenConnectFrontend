import { Component, OnInit } from '@angular/core';
import { PetitionService } from '../../../services/petition.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpetition',
  templateUrl: './adminpetition.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./adminpetition.component.scss']
})
export class AdminpetitionComponent implements OnInit {
  petitions: any[] = [];
  selectedPetition: any = null;

  constructor(private petitionService: PetitionService) {}

  ngOnInit(): void {
    this.fetchPetitions();
  }

  fetchPetitions(): void {
    this.petitionService.getAllPetitions().subscribe({
      next: (data) => {
        // Each petition should now include populated `createdBy` user details
        this.petitions = data;
      },
      error: (err) => {
        console.error('Failed to load petitions', err);
      }
    });
  }

  editPetition(petition: any): void {
    this.selectedPetition = { ...petition }; // clone for editing
  }

  cancelEdit(): void {
    this.selectedPetition = null;
  }

  submitEdit(): void {
    const { _id, ...updateData } = this.selectedPetition;
    this.petitionService.updatePetition(_id, updateData).subscribe({
      next: () => {
        this.fetchPetitions();
        this.selectedPetition = null;
      },
      error: (err: any) => {
        console.error('Failed to update petition', err);
      }
    });
  }

  deletePetition(id: string): void {
    if (confirm('Are you sure you want to delete this petition?')) {
      this.petitionService.deletePetition(id).subscribe({
        next: () => this.fetchPetitions(),
        error: (err: any) => console.error('Failed to delete petition', err)
      });
    }
  }
}
