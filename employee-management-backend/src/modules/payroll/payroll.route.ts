import { Router } from 'express';
import { PayrollController } from './payroll.controller';

const router = Router();
const payrollController = new PayrollController();

// Employee routes
router.get('/current/:employeeId', (req, res) => payrollController.getCurrentMonthPayroll(req, res));
router.get('/history/:employeeId', (req, res) => payrollController.getPayslipHistory(req, res));
router.get('/payslip/:id', (req, res) => payrollController.downloadPayslip(req, res));

// Admin routes
router.post('/', (req, res) => payrollController.createPayroll(req, res));
router.put('/:id', (req, res) => payrollController.updatePayroll(req, res));

export default router;