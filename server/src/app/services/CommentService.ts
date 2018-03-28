import { ICommentModel } from '../interfaces/models/IComment';
import { Comment } from '../models';
import { IPostModel } from '../interfaces/models/IPost';
import { HttpError } from '../errors/HttpError';
import { ObjectID } from 'bson';

export class CommentService {
  public static async createComment (
    input: ICommentModel,
    post: IPostModel): Promise<ICommentModel>   {
    const comment = new Comment({ ...input, post: post._id });

    post.comments.push(comment);
    await post.save();

    return comment.save();
  }

  public static async updateComment (id: string, input: ICommentModel): Promise<ICommentModel> {
    this.checkId(id);
    const comment = await Comment.findById({ id });

    if (!comment) {
      throw new HttpError(404, 'Comment not found');
    }

    comment.set(input);

    return comment.save();
  }

  public static async deleteComment (id: string): Promise<ICommentModel> {
    this.checkId(id);
    const comment = await Comment.findById({ id });

    if (!comment) {
      throw new HttpError(404, 'Comment not found');
    }

    return comment.remove();
  }

  private static checkId (id: string) {
    if (!ObjectID.isValid(id)) throw new HttpError(404, 'Post not found');
  }
}
