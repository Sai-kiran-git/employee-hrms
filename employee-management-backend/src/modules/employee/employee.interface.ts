export interface IEmployee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  joiningDate: Date;
  address: string;
  profileImage?: string;

  createdAt?: Date;
  updatedAt?: Date;
}