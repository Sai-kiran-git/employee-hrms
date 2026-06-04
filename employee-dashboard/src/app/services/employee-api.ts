import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApi {

  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  // =====================================================
  // 🔐 AUTH APIs
  // =====================================================

  register(data: { email: string; password: string; role?: string }) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // =====================================================
  // 👨‍💼 EMPLOYEE APIs
  // =====================================================

  createEmployee(data: any) {
    return this.http.post(`${this.baseUrl}/employees`, data);
  }

  getEmployees() {
    return this.http.get(`${this.baseUrl}/employees`);
  }

  getEmployee(id: string) {
    return this.http.get(`${this.baseUrl}/employees/${id}`);
  }

  updateEmployee(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/employees/${id}`, data);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

  // =====================================================
  // ⏱️ ATTENDANCE APIs
  // =====================================================

  checkIn(employeeId: string) {
    return this.http.post(`${this.baseUrl}/attendance/checkin`, {
      employeeId
    });
  }

  checkOut(employeeId: string) {
    return this.http.put(`${this.baseUrl}/attendance/checkout`, {
      employeeId
    });
  }

  getTodayAttendance(employeeId: string) {
    return this.http.get(`${this.baseUrl}/attendance/today/${employeeId}`);
  }

  getAttendanceSummary(employeeId: string, year?: number, month?: number) {
    let params = new HttpParams();

    if (year) params = params.set('year', year);
    if (month) params = params.set('month', month);

    return this.http.get(
      `${this.baseUrl}/attendance/summary/${employeeId}`,
      { params }
    );
  }

  getAttendanceHistory(employeeId: string, filters: any = {}) {
    let params = new HttpParams();

    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);
    if (filters.page) params = params.set('page', filters.page);
    if (filters.limit) params = params.set('limit', filters.limit);

    return this.http.get(
      `${this.baseUrl}/attendance/history/${employeeId}`,
      { params }
    );
  }

  markAttendance(data: any) {
    return this.http.post(`${this.baseUrl}/attendance/mark`, data);
  }

  // =====================================================
  // 💰 PAYROLL APIs
  // =====================================================

  createPayroll(data: any) {
    return this.http.post(`${this.baseUrl}/payroll`, data);
  }

  updatePayroll(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/payroll/${id}`, data);
  }

  getCurrentPayroll(employeeId: string) {
    return this.http.get(`${this.baseUrl}/payroll/current/${employeeId}`);
  }

  getPayslipHistory(employeeId: string, page = 1, limit = 10) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(
      `${this.baseUrl}/payroll/history/${employeeId}`,
      { params }
    );
  }

  downloadPayslip(id: string) {
    return this.http.get(`${this.baseUrl}/payroll/payslip/${id}`);
  }
}