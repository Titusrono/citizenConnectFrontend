import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { UsersService } from '../services/users.service'; // adjust path
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

interface User {
  name: string;
  email: string;
  password?: string;
  county: string;
}

@Component({
  selector: 'app-signcrud',
  templateUrl: './signcrud.component.html',
  styleUrls: ['./signcrud.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class SigncrudComponent implements OnInit {
  users: User[] = [];
  isEditMode = false;
  isLoading = false;

  counties = ['County A', 'County B', 'County C'];

  formData: User & { confirmPassword?: string } = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    county: ''
  };

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: () => {
        alert('Failed to fetch users');
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    if (!this.formData.password) {
      alert('Password is required');
      return;
    }

    if (!this.formData.confirmPassword) {
      alert('Confirm Password is required');
      return;
    }

    this.isLoading = true;
    const registerData = {
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password,
      confirmPassword: this.formData.confirmPassword,
      county: this.formData.county
    };
    
    this.userService.registerUser(registerData).subscribe({
      next: () => {
        this.loadUsers();
        this.resetForm();
      },
      error: () => {
        alert('Failed to create user');
        this.isLoading = false;
      }
    });

  }  editUser(user: User) {    this.isEditMode = true;
    this.formData = { ...user, password: '', confirmPassword: '' };
  }

  updateUser() {
    this.isLoading = true;
    this.userService.updateUser(this.formData.email, this.formData).subscribe({
      next: () => {
        this.loadUsers();
        this.resetForm();
      },
      error: () => {
        alert('Update failed');
        this.isLoading = false;
      }
    });
  }

  deleteUser(email: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.isLoading = true;
    this.userService.deleteUser(email).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: () => {
        alert('Delete failed');
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      county: ''
    };
    this.isEditMode = false;
  }
}
