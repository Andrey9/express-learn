import { Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: Date;
  avatar: string;
  comparePass (password: string): boolean;
}
