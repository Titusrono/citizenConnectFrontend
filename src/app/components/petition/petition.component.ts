import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-petition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.scss']
})
export class PetitionComponent {
  petitionForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string = '';  // Message to show on success
  errorMessage: string = '';  // Message to show on error
  showSuccessMessage: boolean = false;  // Control visibility of success message
  showErrorMessage: boolean = false;  // Control visibility of error message

  // Authorities array for dropdown
  authorities: string[] = [
    'Government',
    'Local Council',
    'Education Department',
    'Environmental Agency',
    'Healthcare Authority'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.petitionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      targetAuthority: ['', Validators.required], // Now required
      supportingDocs: ['']
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.petitionForm.valid) {
      const formData = new FormData();
      formData.append('title', this.petitionForm.value.title);
      formData.append('description', this.petitionForm.value.description);
      formData.append('targetAuthority', this.petitionForm.value.targetAuthority);
      if (this.selectedFile) {
        formData.append('supportingDocs', this.selectedFile);
      }

      this.http.post('http://localhost:3000/petitions', formData).subscribe(
        (res) => {
          this.successMessage = 'Petition Successfully Submitted!';
          this.showSuccessMessage = true;
          this.petitionForm.reset();
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        (err) => {
          console.error(err);
          this.errorMessage = 'Submission Failed! Please try again.';
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      );
    } else {
      this.errorMessage = 'Please fill in the required fields!';
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    }
  }
}
