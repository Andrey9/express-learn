import { Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  phone: string | null;
  birthDate: Date | null;
  avatar: string | null;
  comparePass (password: string): boolean;
}
