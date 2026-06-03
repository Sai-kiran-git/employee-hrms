import Employee from './employee.model';
import { IEmployee } from './employee.interface';

export class EmployeeRepository {
  async create(data: IEmployee) {
    return Employee.create(data);
  }

  async findAll() {
    return Employee.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return Employee.findById(id);
  }

  async findByEmployeeId(employeeId: string) {
    return Employee.findOne({ employeeId });
  }

  async update(id: string, data: Partial<IEmployee>) {
    return Employee.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return Employee.findByIdAndDelete(id);
  }
}