import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll.html',
  styleUrl: './payroll.css',
})
export class Payroll {

  employee = {
    name: 'Sai Kiran',
    employeeId: 'EMP001',
    designation: 'Software Engineer'
  };

  currentSalary = {
    netSalary: 65000,
    basicSalary: 45000,
    hra: 12000,
    allowances: 8000,
    deductions: 5000
  };

  payslips = [
    {
      month: 'May 2026',
      grossSalary: 70000,
      deductions: 5000,
      netSalary: 65000,
      status: 'Paid'
    },
    {
      month: 'April 2026',
      grossSalary: 70000,
      deductions: 5000,
      netSalary: 65000,
      status: 'Paid'
    },
    {
      month: 'March 2026',
      grossSalary: 70000,
      deductions: 5000,
      netSalary: 65000,
      status: 'Paid'
    }
  ];

}