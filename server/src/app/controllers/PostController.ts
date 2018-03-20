import { IController } from '../interfaces/IController';
import { Application, NextFunction, Request, Response } from 'express';
import { PostService } from '../services';
import { validateInput } from '../middleware/RequestValidation';
import { PostValidator } from '../middleware/schemas/PostValidator';
import { auth } from '../middleware/Authentication';

export class PostController implements IController {
  init (app: Application): void {
    app.get('/posts', this.index);
    app.post('/posts', auth, validateInput(PostValidator.create), this.create);
    app.get('/posts/:id', this.show);
    app.put('/posts/:id', auth, validateInput(PostValidator.create), this.update);
    app.delete('/posts/:id', auth, this.destroy);
  }

  private async index (req: Request, res: Response) {
    const posts = await PostService.getAllPosts();
    res.json(posts);
  }

  private async show (req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostService.getOnePost(req.query.id);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  private async create (req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user ? req.user : {};
      const post = await PostService.createPost({ ...req.body, author: user._id });

      res.json({ post });
    } catch (err) {
      next(err);
    }
  }

  private async update (req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostService.updatePost(req.query.id, req.body);

      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  private async destroy (req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostService.deletePost(req.query.id);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
}
