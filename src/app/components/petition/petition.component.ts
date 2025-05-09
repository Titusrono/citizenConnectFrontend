import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-petition',
  standalone: true, // 👈🏽 Make it standalone
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule], // 👈🏽 Import Forms + HTTP
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.scss']
})
export class PetitionComponent {
  petitionForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.petitionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      targetAuthority: [''],
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
          alert('Petition Submitted!');
          this.petitionForm.reset();
        },
        (err) => {
          console.error(err);
          alert('Submission Failed!');
        }
      );
    } else {
      alert('Please fill in the required fields!');
    }
  }
}
