import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VirtualMeet, VirtualService } from '../../../services/virtual.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-create',
  templateUrl: './virtual-create.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./virtual-create.component.scss']
})
export class VirtualCreateComponent implements OnInit {
  meetings: VirtualMeet[] = [];
  form: FormGroup;
  editingId: string | null = null;
  loading = false;
  error = '';

  constructor(private virtualService: VirtualService, private fb: FormBuilder) {
    const now = new Date();
    const defaultDate = now.toISOString().slice(0, 16); // Format for datetime-local

    this.form = this.fb.group({
      title: ['', Validators.required],
      agenda: ['', Validators.required],
      date: [defaultDate, Validators.required], // Default to current datetime
      meetLink: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      recordingLink: ['', Validators.pattern(/https?:\/\/.+/)], // Optional URL pattern
      isLive: [false]
    });
  }

  ngOnInit() {
    this.loadMeetings();
  }

  loadMeetings() {
    this.loading = true;
    this.virtualService.getAllMeetings().subscribe({
      next: data => {
        this.meetings = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load meetings.';
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Trigger error messages for all fields
      return;
    }

    const formValue = this.form.value;

    // Convert to full ISO date string
    const isoDate = new Date(formValue.date).toISOString();

    // Remove empty recordingLink to bypass URL validation if not provided
    const meetData: VirtualMeet = {
      ...formValue,
      date: isoDate,
      recordingLink: formValue.recordingLink?.trim() === '' ? undefined : formValue.recordingLink
    };

    if (this.editingId) {
      this.virtualService.updateMeeting(this.editingId, meetData).subscribe({
        next: () => {
          this.loadMeetings();
          this.resetForm();
        },
        error: err => {
          console.error('Update error:', err);
          this.error = 'Failed to update meeting: ' + (err?.error?.message || err.message || 'Unknown error');
        }
      });
    } else {
      this.virtualService.createMeeting(meetData).subscribe({
        next: () => {
          this.loadMeetings();
          this.resetForm();
        },
        error: err => {
          console.error('Create error:', err);
          this.error = 'Failed to create meeting: ' + (err?.error?.message || err.message || 'Unknown error');
        }
      });
    }
  }

  edit(meeting: VirtualMeet) {
    this.editingId = meeting._id || null;
    const localDate = new Date(meeting.date).toISOString().slice(0, 16); // Format back to datetime-local

    this.form.patchValue({
      title: meeting.title,
      agenda: meeting.agenda,
      date: localDate,
      meetLink: meeting.meetLink,
      recordingLink: meeting.recordingLink,
      isLive: meeting.isLive || false,
    });
  }

  delete(id?: string) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.virtualService.deleteMeeting(id).subscribe({
        next: () => this.loadMeetings(),
        error: () => this.error = 'Failed to delete meeting.'
      });
    }
  }

  resetForm() {
    const defaultDate = new Date().toISOString().slice(0, 16);
    this.form.reset({
      title: '',
      agenda: '',
      date: defaultDate,
      meetLink: '',
      recordingLink: '',
      isLive: false
    });
    this.editingId = null;
    this.error = '';
  }
}
