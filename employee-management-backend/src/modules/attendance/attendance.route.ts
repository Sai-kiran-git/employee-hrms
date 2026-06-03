import { Router } from 'express';
import { AttendanceController } from './attendance.controller';

const router = Router();
const attendanceController = new AttendanceController();

// Employee actions
router.post('/checkin', (req, res) => attendanceController.checkIn(req, res));
router.put('/checkout', (req, res) => attendanceController.checkOut(req, res));

// Employee data (used in your Angular UI)
router.get('/today/:employeeId', (req, res) => attendanceController.getTodayAttendance(req, res));
router.get('/summary/:employeeId', (req, res) => attendanceController.getAttendanceSummary(req, res));
router.get('/history/:employeeId', (req, res) => attendanceController.getAttendanceHistory(req, res));

// Admin: manually mark attendance
router.post('/mark', (req, res) => attendanceController.markAttendance(req, res));

export default router;