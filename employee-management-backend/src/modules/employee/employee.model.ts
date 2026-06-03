import mongoose, { Schema, Document } from 'mongoose';
import { IEmployee } from './employee.interface';

export interface IEmployeeDocument
  extends IEmployee,
    Document {}

const EmployeeSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEmployeeDocument>(
  'Employee',
  EmployeeSchema
);