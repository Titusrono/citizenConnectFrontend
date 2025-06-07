import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  isHomeRoute(): boolean {
    // Check if the current URL is exactly /dashboard or /dashboard/
    return this.router.url === '/dashboard' || this.router.url === '/dashboard/';
  }
}
