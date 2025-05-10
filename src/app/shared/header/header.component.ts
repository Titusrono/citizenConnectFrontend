import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
logout() {
throw new Error('Method not implemented.');
}
// For managing the visibility of the mobile menu
toggleProfile($event: MouseEvent) {
throw new Error('Method not implemented.');
}
isProfileOpen: any;
toggleTheme() {
throw new Error('Method not implemented.');
}
  // For managing the visibility of the dropdown
  dropdownVisible = false;

  // For managing the visibility of the mobile menu
  mobileMenuVisible = false;
isDark: any;

  // Toggle function for the dropdown visibility
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Close the dropdown (called when link is clicked)
  closeDropdown() {
    this.dropdownVisible = false;
  }

  // Toggle function for the mobile menu visibility
  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
