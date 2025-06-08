import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
//import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.scss']
})
export class ReportAdminComponent implements OnInit {

  reports: any[] = [];  // Array to store the reports
  isLoading: boolean = false;  // Loading state flag

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchReports();  // Fetch reports when the component is initialized
  }

  // Method to fetch reports from the backend
  fetchReports(): void {
    this.isLoading = true;  // Set loading flag to true when fetching reports

    this.reportService.getReports().subscribe(
      (data: any[]) => {
        this.reports = data;  // Store the fetched data in the reports array
        this.isLoading = false;  // Reset loading flag after data is fetched
      },
      (error: any) => {
        console.error('Error fetching reports:', error);
        this.isLoading = false;  // Reset loading flag in case of error
      }
    );
  }

  // Method to delete a report
  deleteReport(reportId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this report?');
    if (!confirmDelete) return;

    this.isLoading = true;  // Set loading flag to true when deleting a report

    this.reportService.deleteReport(reportId).subscribe(
      () => {
        this.fetchReports();  // Refresh the report list after deletion
        this.isLoading = false;  // Reset loading flag after deletion
      },
      (error: any) => {
        console.error('Error deleting report:', error);
        this.isLoading = false;  // Reset loading flag in case of error
      }
    );
  }
}
