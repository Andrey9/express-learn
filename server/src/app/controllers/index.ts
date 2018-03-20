import { UserController } from './UserController';
import { IController } from '../interfaces/IController';
import { AuthController } from './AuthController';

export const CONTROLLERS: IController[] = [
  new UserController,
  new AuthController,
];
