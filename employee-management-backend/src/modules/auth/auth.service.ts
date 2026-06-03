import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AuthRepository } from './auth.repository';
import { IAuth, ILoginResponse, UserRole } from './auth.interface';

const authRepo = new AuthRepository();

export class AuthService {

  async register(
    email: string,
    password: string,
    role: UserRole = UserRole.EMPLOYEE
  ): Promise<any> {
    const existingUser = await authRepo.findByEmail(email);

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const count = await authRepo.countDocuments();

    const employeeId = `EM${1001 + count}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authRepo.create({
      employeeId,
      email,
      password: hashedPassword,
      role,
    });

    return {
      id: String(user._id),
      employeeId: user.employeeId,
      email: user.email,
      role: user.role,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<ILoginResponse> {
    const user = await authRepo.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        employeeId: user.employeeId,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    return {
      token,
      user: {
        id: user._id.toString(),
        employeeId: user.employeeId,
        email: user.email,
        role: user.role,
      },
    };
  }
}