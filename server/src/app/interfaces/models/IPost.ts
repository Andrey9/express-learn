import { Document } from 'mongoose';
import { IUserModel } from './IUser';
import { ICommentModel } from './IComment';

export interface IPostModel extends Document {
  title: string;
  content: string;
  slug: string;
  author: IUserModel | string;
  comments: ICommentModel[];
}
