import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  isEditing = false;

  employee = {
    employeeId: 'EMP001',
    firstName: 'Sai',
    lastName: 'Kiran',
    email: 'saikiran@example.com',
    phone: '+91 9876543210',
    department: 'Engineering',
    designation: 'Software Engineer',
    joiningDate: '2025-01-15',
    address: 'Hyderabad, Telangana',
  };

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    console.log('Profile Saved', this.employee);
    this.isEditing = false;
  }
}