export enum PayrollStatus {
  PAID = 'paid',
  PENDING = 'pending',
  PROCESSING = 'processing',
}

export interface ISalaryStructure {
  basicSalary: number;
  hra: number;
  allowances: number;
  deductions: number;
  grossSalary: number;
  netSalary: number;
}

export interface IPayroll {
  employeeId: string;
  month: number;       // 1-12
  year: number;
  basicSalary: number;
  hra: number;
  allowances: number;
  deductions: number;
  grossSalary: number;
  netSalary: number;
  status: PayrollStatus;
  payslipUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}