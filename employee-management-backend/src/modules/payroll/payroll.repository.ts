import PayrollModel, { IPayrollDocument } from './payroll.model';
import { IPayroll } from './payroll.interface';

export class PayrollRepository {
  // Create a new payroll record
  async create(data: Partial<IPayroll>): Promise<IPayrollDocument> {
    return PayrollModel.create(data);
  }

  // Update payroll by ID
  async update(id: string, data: Partial<IPayroll>): Promise<IPayrollDocument | null> {
    return PayrollModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Get current month payroll for an employee
  async findCurrentMonth(
    employeeId: string,
    month: number,
    year: number
  ): Promise<IPayrollDocument | null> {
    return PayrollModel.findOne({ employeeId, month, year });
  }

  // Get all payroll history for an employee (paginated)
  async findByEmployee(
    employeeId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ records: IPayrollDocument[]; total: number }> {
    const [records, total] = await Promise.all([
      PayrollModel.find({ employeeId })
        .sort({ year: -1, month: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      PayrollModel.countDocuments({ employeeId }),
    ]);

    return { records, total };
  }

  // Find payroll by ID
  async findById(id: string): Promise<IPayrollDocument | null> {
    return PayrollModel.findById(id);
  }
}