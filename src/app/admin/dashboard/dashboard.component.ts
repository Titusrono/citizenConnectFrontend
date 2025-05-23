import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈🏽 Needed for *ngIf, *ngFor, etc.
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; // 👈🏽 Needed for routing

@Component({
  selector: 'app-dashboard',
  standalone: true, // 👈🏽 Mark it as standalone
  imports: [CommonModule, RouterLink,RouterLinkActive], // 👈🏽 Import everything needed
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // 👈🏽 Typo fixed here: styleUrls not styleUrl
})
export class DashboardComponent {

}


