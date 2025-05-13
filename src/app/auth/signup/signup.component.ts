import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  county: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  formData: SignupData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    county: ''
  };

  counties: string[] = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta",
    "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", 
    "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", 
    "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia", 
    "Uasin Gishu", "Elgeyo Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", 
    "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", 
    "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", 
    "Nairobi"
  ];

  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.isLoading = true;

    // ✅ Send only valid backend fields
    const signupPayload = {
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password,
      county: this.formData.county
    };

    this.authService.signup(signupPayload).subscribe(
      (response: any) => {
        alert('Account created successfully!');
        this.resetForm();
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;

        // ✅ See actual backend error in console
        console.error('Backend Error Response:', error);

        alert('Error creating account. Please try again.');
      }
    );
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      county: ''
    };
  }
}
