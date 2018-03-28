import { Document } from 'mongoose';
import { IUserModel } from './IUser';
import { IPostModel } from './IPost';

export interface ICommentModel extends Document {
  comment: string;
  author: IUserModel | string;
  post: IPostModel | string;
}
