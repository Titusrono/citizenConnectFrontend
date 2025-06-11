import { Component, OnInit } from '@angular/core';
import { VirtualMeet, VirtualService } from '../../../services/virtual.service';
import { CommonModule } from '@angular/common';
//import { VirtualService, VirtualMeet } from '../services/virtual.service';

@Component({
  selector: 'app-streaminglive',
  templateUrl: './streaminglive.component.html',
  imports:[CommonModule],
  styleUrls: ['./streaminglive.component.css']
})
export class StreamingliveComponent implements OnInit {
  meetings: VirtualMeet[] = [];
  loading = false;
  error = '';

  constructor(private virtualService: VirtualService) {}

  ngOnInit(): void {
    this.fetchMeetings();
  }

  fetchMeetings() {
    this.loading = true;
    this.error = '';
    this.virtualService.getAllMeetings().subscribe({
      next: (data: VirtualMeet[]) => {
        this.meetings = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load meetings.';
        this.loading = false;
      }
    });
  }
}
