import { PayrollRepository } from './payroll.repository';
import { PayrollStatus } from './payroll.interface';

const payrollRepo = new PayrollRepository();

export class PayrollService {
  // Calculate gross and net salary from components
  private calculateSalary(
    basicSalary: number,
    hra: number,
    allowances: number,
    deductions: number
  ): { grossSalary: number; netSalary: number } {
    const grossSalary = basicSalary + hra + allowances;
    const netSalary = grossSalary - deductions;
    return { grossSalary, netSalary };
  }

  // Create payroll for an employee for a specific month
  async createPayroll(
    employeeId: string,
    month: number,
    year: number,
    basicSalary: number,
    hra: number,
    allowances: number,
    deductions: number
  ): Promise<any> {
    // Check if payroll already exists for this month
    const existing = await payrollRepo.findCurrentMonth(employeeId, month, year);
    if (existing) {
      throw new Error(`Payroll already exists for this employee for ${month}/${year}`);
    }

    const { grossSalary, netSalary } = this.calculateSalary(
      basicSalary,
      hra,
      allowances,
      deductions
    );

    const record = await payrollRepo.create({
      employeeId,
      month,
      year,
      basicSalary,
      hra,
      allowances,
      deductions,
      grossSalary,
      netSalary,
      status: PayrollStatus.PENDING,
    });

    return record;
  }

  // Update payroll record
  async updatePayroll(
    id: string,
    data: {
      basicSalary?: number;
      hra?: number;
      allowances?: number;
      deductions?: number;
      status?: PayrollStatus;
    }
  ): Promise<any> {
    const existing = await payrollRepo.findById(id);
    if (!existing) throw new Error('Payroll record not found');

    const basicSalary = data.basicSalary ?? existing.basicSalary;
    const hra = data.hra ?? existing.hra;
    const allowances = data.allowances ?? existing.allowances;
    const deductions = data.deductions ?? existing.deductions;

    const { grossSalary, netSalary } = this.calculateSalary(
      basicSalary,
      hra,
      allowances,
      deductions
    );

    const updated = await payrollRepo.update(id, {
      ...data,
      basicSalary,
      hra,
      allowances,
      deductions,
      grossSalary,
      netSalary,
    });

    return updated;
  }

  // Get current month salary details (for the top card in UI)
  async getCurrentMonthPayroll(employeeId: string): Promise<any> {
    const now = new Date();
    const record = await payrollRepo.findCurrentMonth(
      employeeId,
      now.getMonth() + 1,
      now.getFullYear()
    );

    if (!record) return null;

    return {
      basicSalary: record.basicSalary,
      hra: record.hra,
      allowances: record.allowances,
      deductions: record.deductions,
      grossSalary: record.grossSalary,
      netSalary: record.netSalary,
      status: record.status,
      month: record.month,
      year: record.year,
    };
  }

  // Get payslip history (for the table in UI)
  async getPayslipHistory(
    employeeId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<any> {
    const { records, total } = await payrollRepo.findByEmployee(employeeId, page, limit);

    return {
      history: records.map((r) => ({
        id: r._id,
        month: r.month,
        year: r.year,
        grossSalary: r.grossSalary,
        deductions: r.deductions,
        netSalary: r.netSalary,
        status: r.status,
        payslipUrl: r.payslipUrl ?? null,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Get payslip download URL for a specific month
  async getPayslip(id: string): Promise<any> {
    const record = await payrollRepo.findById(id);
    if (!record) throw new Error('Payroll record not found');
    if (!record.payslipUrl) throw new Error('Payslip not yet generated');

    return { payslipUrl: record.payslipUrl };
  }
}