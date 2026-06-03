import { Request, Response } from 'express';
import { AttendanceService } from './attendance.service';
import {
  checkInValidation,
  checkOutValidation,
  markAttendanceValidation,
  attendanceHistoryValidation,
} from './attendance.validation';
import { AttendanceStatus } from './attendance.interface';
 
const attendanceService = new AttendanceService();
 
export class AttendanceController {
  /**
   * POST /attendance/checkin
   * Employee checks in for the day
   * Body: { employeeId }
   */
  async checkIn(req: Request, res: Response): Promise<void> {
    try {
      const { error } = checkInValidation.validate(req.body);
      if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
      }
 
      const { employeeId } = req.body;
      const record = await attendanceService.checkIn(employeeId);
 
      res.status(201).json({
        success: true,
        message: 'Check-in successful',
        data: record,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
 
  /**
   * PUT /attendance/checkout
   * Employee checks out for the day
   * Body: { employeeId }
   */
  async checkOut(req: Request, res: Response): Promise<void> {
    try {
      const { error } = checkOutValidation.validate(req.body);
      if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
      }
 
      const { employeeId } = req.body;
      const record = await attendanceService.checkOut(employeeId);
 
      res.status(200).json({
        success: true,
        message: 'Check-out successful',
        data: record,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
 
  /**
   * GET /attendance/today/:employeeId
   * Get today's check-in, check-out, status, working hours
   */
  async getTodayAttendance(req: Request, res: Response): Promise<void> {
    try {
      const employeeId = String(req.params.employeeId);
      if (!employeeId) {
        res.status(400).json({ success: false, message: 'employeeId is required' });
        return;
      }
 
      const data = await attendanceService.getTodayAttendance(employeeId);
 
      res.status(200).json({
        success: true,
        message: data ? "Today's attendance fetched" : 'No attendance record for today',
        data: data ?? {
          checkIn: null,
          checkOut: null,
          status: AttendanceStatus.ABSENT,
          workingHours: 0,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
 
  /**
   * GET /attendance/summary/:employeeId
   * Get attendance summary: present, absent, late, leave, total working days
   * Query: ?year=2024&month=6
   */
  async getAttendanceSummary(req: Request, res: Response): Promise<void> {
    try {
      const employeeId = String(req.params.employeeId);
      const { year, month } = req.query;
 
      if (!employeeId) {
        res.status(400).json({ success: false, message: 'employeeId is required' });
        return;
      }
 
      const summary = await attendanceService.getAttendanceSummary(
        employeeId,
        year ? parseInt(year as string) : undefined,
        month ? parseInt(month as string) : undefined
      );
 
      res.status(200).json({
        success: true,
        message: 'Attendance summary fetched',
        data: summary,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
 
  /**
   * GET /attendance/history/:employeeId
   * Get attendance history: date, checkIn, checkOut, status
   * Query: ?startDate=2024-01-01&endDate=2024-06-30&page=1&limit=10
   */
  async getAttendanceHistory(req: Request, res: Response): Promise<void> {
    try {
      const employeeId = String(req.params.employeeId);
      const { error, value } = attendanceHistoryValidation.validate({
        employeeId,
        ...req.query,
      });
 
      if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
      }
 
      const { startDate, endDate, page, limit } = value;
 
      const result = await attendanceService.getAttendanceHistory(
        employeeId,
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined,
        page,
        limit
      );
 
      res.status(200).json({
        success: true,
        message: 'Attendance history fetched',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
 
  /**
   * POST /attendance/mark  (Admin only)
   * Manually mark attendance for an employee
   * Body: { employeeId, date, status, checkIn?, checkOut? }
   */
  async markAttendance(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = markAttendanceValidation.validate(req.body);
      if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
      }
 
      const { employeeId, date, status, checkIn, checkOut } = value;
 
      const record = await attendanceService.markAttendance(
        employeeId,
        new Date(date),
        status as AttendanceStatus,
        checkIn ? new Date(checkIn) : undefined,
        checkOut ? new Date(checkOut) : undefined
      );
 
      res.status(201).json({
        success: true,
        message: 'Attendance marked successfully',
        data: record,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
 
