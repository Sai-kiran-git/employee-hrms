import Joi from 'joi';
import { PayrollStatus } from './payroll.interface';

export const createPayrollValidation = Joi.object({
  employeeId: Joi.string().required(),
  month: Joi.number().min(1).max(12).required(),
  year: Joi.number().min(2000).max(2100).required(),
  basicSalary: Joi.number().min(0).required(),
  hra: Joi.number().min(0).required(),
  allowances: Joi.number().min(0).required(),
  deductions: Joi.number().min(0).required(),
});

export const updatePayrollValidation = Joi.object({
  basicSalary: Joi.number().min(0).optional(),
  hra: Joi.number().min(0).optional(),
  allowances: Joi.number().min(0).optional(),
  deductions: Joi.number().min(0).optional(),
  status: Joi.string()
    .valid(...Object.values(PayrollStatus))
    .optional(),
});

export const payrollHistoryValidation = Joi.object({
  employeeId: Joi.string().required(),
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
});