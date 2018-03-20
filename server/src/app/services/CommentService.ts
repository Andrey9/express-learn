import { ICommentModel } from '../interfaces/models/IComment';
import { Comment } from '../models';

export class CommentService {
  public static create (input: ICommentModel): Promise<ICommentModel>   {
    const comment = new Comment(input);

    return comment.save();
  }
}
