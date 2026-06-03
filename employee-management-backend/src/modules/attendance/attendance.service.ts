import { AttendanceRepository } from './attendance.repository';
import { AttendanceStatus, IAttendanceSummary, ITodayAttendance } from './attendance.interface';

const attendanceRepo = new AttendanceRepository();

export class AttendanceService {
  // Check In
  async checkIn(employeeId: string): Promise<any> {
    const existing = await attendanceRepo.findTodayByEmployee(employeeId);
    if (existing) {
      throw new Error('Already checked in for today');
    }

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Mark as LATE if check-in is after 9:30 AM
    const lateThreshold = new Date(today);
    lateThreshold.setHours(9, 30, 0, 0);
    const status = now > lateThreshold ? AttendanceStatus.LATE : AttendanceStatus.PRESENT;

    const record = await attendanceRepo.create({
      employeeId,
      date: today,
      checkIn: now,
      status,
    });

    return record;
  }

  // Check Out
  async checkOut(employeeId: string): Promise<any> {
    const record = await attendanceRepo.findTodayByEmployee(employeeId);
    if (!record) {
      throw new Error('No check-in found for today');
    }
    if (record.checkOut) {
      throw new Error('Already checked out for today');
    }

    const now = new Date();
    const checkInTime = record.checkIn as Date;
    const diffMs = now.getTime() - checkInTime.getTime();
    const workingHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));

    const updated = await attendanceRepo.update(record._id.toString(), {
      checkOut: now,
      workingHours,
    });

    return updated;
  }

  // Get today's attendance for an employee
  async getTodayAttendance(employeeId: string): Promise<ITodayAttendance | null> {
    const record = await attendanceRepo.findTodayByEmployee(employeeId);
    if (!record) return null;

    return {
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      status: record.status as AttendanceStatus,
      workingHours: record.workingHours,
    };
  }

  // Get attendance history with pagination
  async getAttendanceHistory(
    employeeId: string,
    startDate?: Date,
    endDate?: Date,
    page: number = 1,
    limit: number = 10
  ): Promise<any> {
    const { records, total } = await attendanceRepo.findByEmployee(
      employeeId,
      startDate,
      endDate,
      page,
      limit
    );

    return {
      history: records.map((r) => ({
        date: r.date,
        checkIn: r.checkIn,
        checkOut: r.checkOut,
        status: r.status,
        workingHours: r.workingHours,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Get attendance summary (present/absent/late/leave counts)
  async getAttendanceSummary(
    employeeId: string,
    year?: number,
    month?: number
  ): Promise<IAttendanceSummary> {
    const now = new Date();
    const y = year ?? now.getFullYear();
    const m = month ?? now.getMonth() + 1;

    const summary = await attendanceRepo.getSummary(employeeId, y, m);

    return {
      employeeId,
      totalPresent: summary[AttendanceStatus.PRESENT],
      totalAbsent: summary[AttendanceStatus.ABSENT],
      totalLate: summary[AttendanceStatus.LATE],
      totalLeave: summary[AttendanceStatus.LEAVE],
      totalWorkingDays:
        summary[AttendanceStatus.PRESENT] +
        summary[AttendanceStatus.ABSENT] +
        summary[AttendanceStatus.LATE] +
        summary[AttendanceStatus.LEAVE],
    };
  }

  // Admin: manually mark attendance
  async markAttendance(
    employeeId: string,
    date: Date,
    status: AttendanceStatus,
    checkIn?: Date,
    checkOut?: Date
  ): Promise<any> {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    let workingHours = 0;
    if (checkIn && checkOut) {
      const diffMs = checkOut.getTime() - checkIn.getTime();
      workingHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));
    }

    const record = await attendanceRepo.create({
      employeeId,
      date: day,
      checkIn,
      checkOut,
      status,
      workingHours,
    });

    return record;
  }
}