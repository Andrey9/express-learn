import { IController } from '../interfaces/IController';
import { Application, NextFunction, Request, Response } from 'express';
import { PostService, CommentService } from '../services';
import { auth } from '../middleware/Authentication';
import { validateInput } from '../middleware/RequestValidation';
import { CommentValidator } from '../middleware/schemas/CommentValidator';

export class CommentController implements IController {
  init (app: Application): void {
    app.post('/posts/:post_id/comments', auth, validateInput(CommentValidator.create), this.create);
    app.post(
      '/posts/:post_id/comments/:comment_id',
      auth,
      validateInput(CommentValidator.create),
      this.update);
  }

  private async create (req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostService.getOnePost(req.query.post_id);
      const user = req.user ? req.user : {};
      const comment = await CommentService.create({ ...req.body, author: user._id }, post);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  private async update (req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await CommentService.update(req.query.comment_id);
      res.json({ comment });
    } catch (error) {
      next(error);
    }
  }
}
