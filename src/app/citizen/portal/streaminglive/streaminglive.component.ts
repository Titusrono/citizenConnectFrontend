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
  meetings: (VirtualMeet & { isUpcoming: boolean; isPast: boolean; isLive: boolean })[] = [];
  filteredMeetings: typeof this.meetings = [];
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
    const now = new Date();

    this.virtualService.getAllMeetings().subscribe({
      next: (data: VirtualMeet[]) => {
        this.meetings = data
          .map(meet => {
            const meetDate = new Date(meet.date);
            return {
              ...meet,
              isUpcoming: meetDate > now && !(meet.isLive ?? false),
              isPast: meetDate < now && !(meet.isLive ?? false),
              isLive: meet.isLive ?? false
            };
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        this.applyFilter(this.filterType);
        this.loading = false;
      },      error: () => {
        this.error = 'Failed to load meetings.';
        this.loading = false;
      }
    });
  }

  applyFilter(type: 'all' | 'upcoming' | 'past' | 'live') {
    this.filterType = type;
    switch (type) {
      case 'upcoming':
        this.filteredMeetings = this.meetings.filter(meet => meet.isUpcoming);
        break;
      case 'past':
        this.filteredMeetings = this.meetings.filter(meet => meet.isPast);
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

  getStatus(meeting: VirtualMeet & { isUpcoming: boolean; isPast: boolean; isLive: boolean }): 'Upcoming' | 'Past' | 'Live' {
    if (meeting.isLive) return 'Live';
    if (meeting.isUpcoming) return 'Upcoming';
    return 'Past';
  }

  getCountdown(meeting: VirtualMeet): string {
    const now = new Date().getTime();
    const meetTime = new Date(meeting.date).getTime();
    const diff = meetTime - now;

    if (diff <= 0) return '';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  }
}
