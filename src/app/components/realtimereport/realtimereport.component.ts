import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-realtimereport',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './realtimereport.component.html',
  styleUrls: ['./realtimereport.component.scss']
})
export class RealtimereportComponent {

  // Submit method for the report form
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Adjust the endpoint to match your NestJS route
    fetch('http://localhost:3000/report', {  // Correct endpoint
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        this.showPopup("✅ Issue reported successfully!");
        form.reset(); // Reset form on successful submission
      } else {
        this.showPopup("❌ Failed to report the issue.", true);
      }
    })
    .catch(() => {
      this.showPopup("❌ Error while submitting.", true);
    });
  }

  // Method to show the popup with message
  showPopup(message: string, isError = false) {
    const popup = document.getElementById('popup');
    if (!popup) return;

    popup.innerHTML = message;

    // Add classes dynamically based on success or error
    popup.className = `fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg z-50 transition transform duration-300 ease-out
      ${isError ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`;

    // Show popup
    popup.classList.remove('hidden');
    popup.classList.add('opacity-100', 'scale-100');

    // Hide popup after 3 seconds
    setTimeout(() => {
      popup.classList.remove('opacity-100', 'scale-100');
      popup.classList.add('hidden');
    }, 3000);
  }
}
