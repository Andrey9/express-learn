import { Document } from 'mongoose';
import { IUserModel } from './IUser';

export interface IPostModel extends Document {
  title: string;
  content: string;
  slug: string;
  author: IUserModel | string;
}
