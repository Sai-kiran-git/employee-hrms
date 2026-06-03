import mongoose, { Schema, Document } from 'mongoose';
import { IAttendance, AttendanceStatus } from './attendance.interface';

export interface IAttendanceDocument extends IAttendance, Document {}

const AttendanceSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      type: Date,
      default: null,
    },
    checkOut: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      default: AttendanceStatus.ABSENT,
    },
    workingHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one attendance record per employee per day
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model<IAttendanceDocument>('Attendance', AttendanceSchema);