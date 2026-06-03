import Auth from './auth.model';
import { IAuth } from './auth.interface';

export class AuthRepository {
  async create(data: IAuth) {
    return Auth.create(data);
  }

  async findByEmail(email: string) {
    return Auth.findOne({ email });
  }

  async findByEmployeeId(employeeId: string) {
    return Auth.findOne({ employeeId });
  }

  async findById(id: string) {
    return Auth.findById(id);
  }

  async countDocuments(): Promise<number> {
  return Auth.countDocuments();
}
}