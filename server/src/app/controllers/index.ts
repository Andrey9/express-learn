import { UserController } from './UserController';
import { IController } from '../interfaces/IController';
import { AuthController } from './AuthController';
import { PostController } from './PostController';

export const CONTROLLERS: IController[] = [
  new UserController,
  new AuthController,
  new PostController
];
