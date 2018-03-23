import { Post } from '../models';
import { IPostModel } from '../interfaces/models/IPost';
import { HttpError } from '../errors/HttpError';
import { ObjectID } from 'bson';

export class PostService {
  public static async getAllPosts (): Promise<IPostModel[]> {
    return Post.find({});
  }

  public static async getOnePost (id: string): Promise<IPostModel> {
    this.checkId(id);
    const post = await Post.findById(id)
      .populate('comments')
      .populate('author');

    if (!post) {
      throw new HttpError(404, 'Post not found');
    }

    return post;
  }

  public static createPost (input: IPostModel): Promise<IPostModel> {
    const post = new Post(input);

    return post.save();
  }

  public static async updatePost (id: string, input: IPostModel): Promise<IPostModel> {
    this.checkId(id);
    const post = await Post.findById({ id });

    if (!post) {
      throw new HttpError(404, 'Post not found');
    }

    post.set(input);

    return post.save();
  }

  public static async deletePost (id: string): Promise<IPostModel> {
    this.checkId(id);
    const post = await Post.findById({ id });

    if (!post) {
      throw new HttpError(404, 'Post not found');
    }

    return post.remove();
  }

  private static checkId (id: string) {
    if (!ObjectID.isValid(id)) throw new HttpError(404, 'Post not found');
  }
}
