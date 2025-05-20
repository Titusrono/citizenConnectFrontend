import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // UI States
  dropdownVisible = false;
  mobileMenuVisible = false;
  mobileAdminMenuVisible = false;
  isProfileOpen = false;
  isDark = false;

  isLoggedIn = false;
  userRole: string | null = null;

  private loginSub?: Subscription;

  constructor(
    private router: Router,
    public authService: AuthService // public for template access
  ) {}

  ngOnInit() {
    this.loginSub = this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.userRole = this.authService.getRole();
    });
  }

  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }

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

  // Close mobile menu
  closeMobileMenu() {
    this.mobileMenuVisible = false;
    this.mobileAdminMenuVisible = false;
  }

  // Toggle user profile dropdown
  toggleProfile(event: MouseEvent) {
    event.stopPropagation();
    this.isProfileOpen = !this.isProfileOpen;
  }

  // Perform logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Toggle dark/light theme
  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark', this.isDark);
  }
}
