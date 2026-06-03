import { Request, Response } from 'express';
import { PayrollService } from './payroll.service';
import {
  createPayrollValidation,
  updatePayrollValidation,
  payrollHistoryValidation,
} from './payroll.validation';

const payrollService = new PayrollService();

export class PayrollController {
  /**
   * POST /payroll
   * Admin creates payroll for an employee for a specific month
   * Body: { employeeId, month, year, basicSalary, hra, allowances, deductions }
   */
  async createPayroll(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createPayrollValidation.validate(req.body);
      if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
      }

      const { employeeId, month, year, basicSalary, hra, allowances, deductions } = value;

      const record = await payrollService.createPayroll(
        employeeId,
        month,
        year,
        basicSalary,
        hra,
        allowances,
        deductions
      );

      res.status(201).json({
        success: true,
        message: 'Payroll created successfully',
        data: record,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  /**
   * PUT /payroll/:id
   * Admin updates a payroll record
   * Body: { basicSalary?, hra?, allowances?, deductions?, status? }
   */
  async updatePayroll(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const { error, value } = updatePayrollValidation.validate(req.body);
      if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
      }

     const record = await payrollService.updatePayroll(id, value);

      res.status(200).json({
        success: true,
        message: 'Payroll updated successfully',
        data: record,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  /**
   * GET /payroll/current/:employeeId
   * Get current month salary details
   * Shows: basicSalary, HRA, allowances, deductions, grossSalary, netSalary
   */
  async getCurrentMonthPayroll(req: Request, res: Response): Promise<void> {
    try {
      const employeeId = String(req.params.employeeId);
      if (!employeeId) {
        res.status(400).json({ success: false, message: 'employeeId is required' });
        return;
      }

      const data = await payrollService.getCurrentMonthPayroll(employeeId);

      res.status(200).json({
        success: true,
        message: data ? 'Current month payroll fetched' : 'No payroll found for current month',
        data: data ?? null,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * GET /payroll/history/:employeeId
   * Get payslip history table
   * Returns: month, year, grossSalary, deductions, netSalary, status, payslipUrl
   * Query: ?page=1&limit=10
   */
  async getPayslipHistory(req: Request, res: Response): Promise<void> {
    try {
      const employeeId = String(req.params.employeeId);
      const { error, value } = payrollHistoryValidation.validate({
        employeeId,
        ...req.query,
      });

      if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
      }

      const { page, limit } = value;
      const result = await payrollService.getPayslipHistory(employeeId, page, limit);

      res.status(200).json({
        success: true,
        message: 'Payslip history fetched',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  /**
   * GET /payroll/payslip/:id
   * Download payslip for a specific payroll record
   * Returns: payslipUrl to download the PDF
   */
  async downloadPayslip(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      if (!id) {
        res.status(400).json({ success: false, message: 'Payroll ID is required' });
        return;
      }

      const data = await payrollService.getPayslip(id);

      res.status(200).json({
        success: true,
        message: 'Payslip URL fetched',
        data,
      });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  }
}