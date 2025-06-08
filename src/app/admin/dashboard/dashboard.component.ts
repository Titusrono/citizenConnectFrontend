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
isSidebarOpen: any;
toggleSidebar() {
throw new Error('Method not implemented.');
}
isHomeRoute(): any {
throw new Error('Method not implemented.');
}
  constructor(private router: Router) {}

  /**
   * Returns true if we're on the dashboard root (i.e., show home cards)
   */
  isRootDashboard(): boolean {
    return this.router.url === '/dashboard' || this.router.url === '/dashboard/';
  }
}
