import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeApi } from '../../services/employee-api';

@Component({
  selector: 'app-attendence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendence.html',
  styleUrl: './attendence.css'
})
export class Attendence implements OnInit {

  employee = {
    name: 'Sai Kiran',
    employeeId: 'EMP001',
    department: 'Engineering'
  };

  todayAttendance: any = {};
  monthlySummary: any = {};
  attendanceHistory: any[] = [];

  loading = false;

  constructor(private api: EmployeeApi) {}

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    const empId = this.employee.employeeId;
    this.loading = true;

    // TODAY
    this.api.getTodayAttendance(empId).subscribe({
      next: (res: any) => {
        this.todayAttendance = res.data;
      }
    });

    // SUMMARY
    this.api.getAttendanceSummary(empId).subscribe({
      next: (res: any) => {
        this.monthlySummary = res.data;
      }
    });

    // HISTORY
    this.api.getAttendanceHistory(empId).subscribe({
      next: (res: any) => {
        this.attendanceHistory = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  checkIn() {
    this.api.checkIn(this.employee.employeeId).subscribe(() => {
      this.loadAttendance(); // refresh UI
    });
  }

  checkOut() {
    this.api.checkOut(this.employee.employeeId).subscribe(() => {
      this.loadAttendance(); // refresh UI
    });
  }
}