import mongoose, { Schema, Document } from 'mongoose';
import { IPayroll, PayrollStatus } from './payroll.interface';

export interface IPayrollDocument extends IPayroll, Document {}

const PayrollSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
      default: 0,
    },
    hra: {
      type: Number,
      required: true,
      default: 0,
    },
    allowances: {
      type: Number,
      required: true,
      default: 0,
    },
    deductions: {
      type: Number,
      required: true,
      default: 0,
    },
    grossSalary: {
      type: Number,
      required: true,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(PayrollStatus),
      default: PayrollStatus.PENDING,
    },
    payslipUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// One payroll record per employee per month per year
PayrollSchema.index({ employeeId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model<IPayrollDocument>('Payroll', PayrollSchema);