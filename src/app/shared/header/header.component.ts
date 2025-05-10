import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // State for dropdown and menus
  dropdownVisible = false;
  mobileMenuVisible = false;
  mobileAdminMenuVisible = false;

  isProfileOpen = false;
  isDark = false;

  constructor(private router: Router) { }

  // Toggle Admin dropdown (Desktop)
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Close dropdown on link click
  closeDropdown() {
    this.dropdownVisible = false;
  }

  // Toggle mobile menu
  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  // Toggle Admin dropdown inside mobile menu
  toggleMobileAdminMenu() {
    this.mobileAdminMenuVisible = !this.mobileAdminMenuVisible;
  }

  // Toggle user profile dropdown
  toggleProfile(event: MouseEvent) {
    event.stopPropagation();
    this.isProfileOpen = !this.isProfileOpen;
  }

  // Logout user
  logout() {
    // You can also clear user session/token here if applicable
    // Example: localStorage.clear();
    this.router.navigate(['/logout']);
  }

  // Optional: Toggle Dark/Light theme
  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
  }
}
