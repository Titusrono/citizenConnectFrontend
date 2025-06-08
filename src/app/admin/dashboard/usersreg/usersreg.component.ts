import { Component, OnInit } from '@angular/core';
import { UsersregService } from '../../../services/usersreg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usersreg',
  templateUrl: './usersreg.component.html',
  styleUrls: ['./usersreg.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UsersregComponent implements OnInit {
  users: any[] = [];
  loading = false;
  errorMessage = '';
  editUser: any = null;

  constructor(private usersregService: UsersregService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.usersregService.getAllUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to fetch users';
        this.loading = false;
        console.error(err);
      }
    });
  }

  startEdit(user: any): void {
    this.editUser = { ...user }; // Avoid mutating original object
  }

  cancelEdit(): void {
    this.editUser = null;
  }

  saveEdit(): void {
    if (!this.editUser) return;

    this.usersregService.updateUser(this.editUser.email, this.editUser).subscribe({
      next: (response: { message: string; user: any }) => {
        const updatedUser = response.user; // Extract updated user from response
        const index = this.users.findIndex(u => u.email === updatedUser.email);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.editUser = null;
      },
      error: (err: any) => {
        alert('Failed to update user');
        console.error(err);
      }
    });
  }

  deleteUser(email: string): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.usersregService.deleteUser(email).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.email !== email);
      },
      error: (err: any) => {
        alert('Failed to delete user');
        console.error(err);
      }
    });
  }
}
