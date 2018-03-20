import { model, Schema } from 'mongoose';
import { IPostModel } from '../interfaces/models/IPost';

const schema = new Schema({
  title: String,
  slug: {
    type: String,
    unique: true,
    index: true
  },
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

schema.pre('save', function (this: IPostModel, next) {
  if (!this.isModified('title')) {
    return next();
  }

  this.slug = this.title.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

  next();
});

export const Post =  model<IPostModel>('Post', schema);
