import mongoose, { Schema, Document } from 'mongoose';
import { IAuth, UserRole } from './auth.interface';

export interface IAuthDocument extends IAuth, Document {}

const AuthSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.EMPLOYEE,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAuthDocument>(
  'Auth',
  AuthSchema
);