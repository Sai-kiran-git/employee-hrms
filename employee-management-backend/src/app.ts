import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.route';
import employeeRoutes from './modules/employee/employee.route';
import attendanceRoutes from './modules/attendance/attendance.route';
import payrollRoutes from './modules/payroll/payroll.route';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // Angular frontend
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/payroll', payrollRoutes);

app.get('/', (req, res) => {
  res.send('Employee Management API Running');
});

export default app;