import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-realtimereport',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './realtimereport.component.html',
  styleUrls: ['./realtimereport.component.scss']
})
export class RealtimereportComponent implements OnInit {
  issues: any[] = [];
  location: string = '';
  showForm = false;
  private readonly apiBaseUrl = 'http://localhost:3000';

  ngOnInit() {
    this.fetchIssues();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.set('location', this.location); // Sync ngModel field

    const token = localStorage.getItem('access_token');

    fetch(`${this.apiBaseUrl}/report`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
        // Do NOT set Content-Type manually when using FormData
      },
      body: formData
    })
      .then(response => {
        if (response.ok) {
          this.showPopup("✅ Issue reported successfully!");
          form.reset();
          this.location = '';
          this.fetchIssues();
          this.showForm = false;
        } else {
          response.json().then(res => {
            this.showPopup(`❌ Failed: ${res.message}`, true);
          });
        }
      })
      .catch(() => {
        this.showPopup("❌ Error while submitting.", true);
      });
  }

  fetchIssues() {
    fetch(`${this.apiBaseUrl}/report`)
      .then(res => res.json())
      .then(data => {
        this.issues = data.map((issue: any) => ({
          ...issue,
          images: (issue.images || []).map((img: string) => `${this.apiBaseUrl}/uploads/${img}`)
        }));
      })
      .catch(() => {
        console.error('Error fetching issues.');
      });
  }

  fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.reverseGeocode(latitude, longitude);
        },
        () => {
          this.showPopup("❌ Unable to retrieve location.", true);
        }
      );
    } else {
      this.showPopup("❌ Geolocation not supported in this browser.", true);
    }
  }

  reverseGeocode(lat: number, lon: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.location = data.display_name || `${lat}, ${lon}`;
      })
      .catch(() => {
        this.location = `${lat}, ${lon}`;
      });
  }

  showPopup(message: string, isError = false) {
    const popup = document.getElementById('popup');
    if (!popup) return;

    popup.innerHTML = message;
    popup.className = `fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg z-50 transition transform duration-300 ease-out
      ${isError ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`;

    popup.classList.remove('hidden');
    popup.classList.add('opacity-100', 'scale-100');

    setTimeout(() => {
      popup.classList.remove('opacity-100', 'scale-100');
      popup.classList.add('hidden');
    }, 3000);
  }
}
