import { UserController } from './UserController';
import { IController } from '../interfaces/IController';
import { AuthController } from './AuthController';
import { PostController } from './PostController';
import { CommentController } from './CommentController';

export const CONTROLLERS: IController[] = [
  new UserController,
  new AuthController,
  new PostController,
  new CommentController
];
