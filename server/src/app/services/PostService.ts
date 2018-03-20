import { Post } from '../models';
import { IPostModel } from '../interfaces/models/IPost';
import { HttpError } from '../errors/HttpError';

export class PostService {
  public static async getAllPosts (): Promise<IPostModel[]> {
    return Post.find({});
  }

  public static async getOnePost (id: string): Promise<IPostModel> {
    const post = await Post.findOne({ id }).populate('author');

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
    const post = await Post.findOne({ id });

    if (!post) {
      throw new HttpError(404, 'Post not found');
    }

    post.set(input);

    return post.save();
  }

  public static async deletePost (id: string): Promise<IPostModel> {
    const post = await Post.findOne({ id });

    if (!post) {
      throw new HttpError(404, 'Post not found');
    }

    return post.remove();
  }
}
