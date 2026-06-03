export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}

export interface IAuth {
  employeeId: string;
  email: string;
  password: string;
  role: UserRole;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    employeeId: string;
    email: string;
    role: UserRole;
  };
}