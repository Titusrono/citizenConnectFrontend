import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSidebarOpen = true;

  constructor(private router: Router) {}

  /**
   * Toggles the sidebar open/closed state
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  /**
   * Returns true if we are on the home route of the dashboard
   */
  isHomeRoute(): boolean {
    return this.router.url === '/dashboard' || this.router.url === '/dashboard/';
  }

  /**
   * Returns true if we're on the dashboard root (i.e., show home cards)
   */
  isRootDashboard(): boolean {
    return this.isHomeRoute(); // alias to maintain existing usage
  }
}
