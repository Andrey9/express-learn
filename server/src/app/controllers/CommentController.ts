import { IController } from '../interfaces/IController';
import { Application, NextFunction, Request, Response } from 'express';
import { PostService, CommentService } from '../services';
import { auth } from '../middleware/Authentication';
import { validateInput } from '../middleware/RequestValidation';
import { CommentValidator } from '../middleware/schemas/CommentValidator';

export class CommentController implements IController {
  init (app: Application): void {
    app.post('/posts/:post_id/comments', auth, validateInput(CommentValidator.create), this.create);
    app.put(
      '/posts/:post_id/comments/:comment_id',
      auth, validateInput(CommentValidator.create),
      this.update
    );
    app.delete('/posts/:post_id/comments/:comment_id', auth, this.destroy);
  }

  private async create (req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostService.getOnePost(req.query.post_id);
      const user = req.user ? req.user : {};
      const comment = await CommentService.createComment({ ...req.body, author: user._id }, post);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  private async update (req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await CommentService.updateComment(req.query.comment_id, req.body);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  private async destroy (req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await CommentService.deleteComment(req.query.comment_id);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
}
