import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈🏽 Needed for *ngIf, *ngFor, etc.
import {  RouterOutlet } from '@angular/router'; // 👈🏽 Needed for routing

@Component({
  selector: 'app-dashboard',
  standalone: true, // 👈🏽 Mark it as standalone
  imports: [CommonModule,RouterOutlet], // 👈🏽 Import everything needed
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // 👈🏽 Typo fixed here: styleUrls not styleUrl
})
export class DashboardComponent {

}

// import { Component } from '@angular/core';
// import { RouterLinkActive } from '@angular/router';


// @Component({
//   selector: 'app-dashboard',
//   imports: [RouterLinkActive],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent {

// }
