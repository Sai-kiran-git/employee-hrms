export interface IAttendance {
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: AttendanceStatus;
  workingHours?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAttendanceSummary {
  employeeId: string;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalLeave: number;
  totalWorkingDays: number;
}

export interface ITodayAttendance {
  checkIn?: Date;
  checkOut?: Date;
  status: AttendanceStatus;
  workingHours?: number;
}

export interface IAttendanceHistory {
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: AttendanceStatus;
  workingHours?: number;
}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  LEAVE = 'leave',
}