import Joi from 'joi';
import { AttendanceStatus } from './attendance.interface';

export const checkInValidation = Joi.object({
  employeeId: Joi.string().required(),
});

export const checkOutValidation = Joi.object({
  employeeId: Joi.string().required(),
});

export const markAttendanceValidation = Joi.object({
  employeeId: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(AttendanceStatus))
    .required(),
  checkIn: Joi.date().optional(),
  checkOut: Joi.date().optional(),
});

export const attendanceHistoryValidation = Joi.object({
  employeeId: Joi.string().required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
});