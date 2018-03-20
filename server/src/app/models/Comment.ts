import { model, Schema } from 'mongoose';
import { ICommentModel } from '../interfaces/models/IComment';

const schema = new Schema({
  comment: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
}, { timestamps: true });

export const Comment =  model<ICommentModel>('Comment', schema);
