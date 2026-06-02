import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendence.html',
  styleUrl: './attendence.css'
})
export class Attendence {

  employee = {
    name: 'Sai Kiran',
    employeeId: 'EMP001',
    department: 'Engineering'
  };

  todayAttendance = {
    checkIn: '09:12 AM',
    checkOut: '--',
    status: 'Present',
    workingHours: '07:25'
  };

  monthlySummary = {
    present: 22,
    absent: 1,
    leave: 2,
    late: 3
  };

  attendanceHistory = [
    {
      date: '02-Jun-2026',
      checkIn: '09:12 AM',
      checkOut: '--',
      status: 'Present'
    },
    {
      date: '01-Jun-2026',
      checkIn: '09:05 AM',
      checkOut: '06:15 PM',
      status: 'Present'
    },
    {
      date: '31-May-2026',
      checkIn: '09:40 AM',
      checkOut: '06:00 PM',
      status: 'Late'
    }
  ];

}