import { EmployeeRepository } from './employee.repository';
import { IEmployee } from './employee.interface';

const employeeRepo = new EmployeeRepository();

export class EmployeeService {
  async createEmployee(data: IEmployee) {
    const existing = await employeeRepo.findByEmployeeId(
      data.employeeId
    );

    if (existing) {
      throw new Error('Employee already exists');
    }

    return employeeRepo.create(data);
  }

  async getEmployees() {
    return employeeRepo.findAll();
  }

  async getEmployee(id: string) {
    const employee = await employeeRepo.findById(id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async updateEmployee(
    id: string,
    data: Partial<IEmployee>
  ) {
    const employee = await employeeRepo.update(id, data);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async deleteEmployee(id: string) {
    const employee = await employeeRepo.delete(id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }
}