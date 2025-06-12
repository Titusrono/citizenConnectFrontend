import { Component, OnInit } from '@angular/core';
import { VirtualMeet, VirtualService } from '../../../services/virtual.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-streaminglive',
  templateUrl: './streaminglive.component.html',
  imports: [CommonModule],
  styleUrls: ['./streaminglive.component.css']
})
export class StreamingliveComponent implements OnInit {
  meetings: VirtualMeet[] = [];
  filteredMeetings: VirtualMeet[] = [];
  loading = false;
  error = '';
  filterType: 'all' | 'upcoming' | 'past' | 'live' = 'all';

  constructor(private virtualService: VirtualService) {}

  ngOnInit(): void {
    this.fetchMeetings();
  }

  fetchMeetings() {
    this.loading = true;
    this.error = '';
    this.virtualService.getAllMeetings().subscribe({
      next: (data: VirtualMeet[]) => {
        this.meetings = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.applyFilter(this.filterType);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load meetings.';
        this.loading = false;
      }
    });
  }

  applyFilter(type: 'all' | 'upcoming' | 'past' | 'live') {
    this.filterType = type;
    const now = new Date();

    switch (type) {
      case 'upcoming':
        this.filteredMeetings = this.meetings.filter(meet => new Date(meet.date) > now && !meet.isLive);
        break;
      case 'past':
        this.filteredMeetings = this.meetings.filter(meet => new Date(meet.date) < now && !meet.isLive);
        break;
      case 'live':
        this.filteredMeetings = this.meetings.filter(meet => meet.isLive);
        break;
      case 'all':
      default:
        this.filteredMeetings = [...this.meetings];
        break;
    }
  }
}
