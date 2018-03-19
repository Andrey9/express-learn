import { User } from '../models';
import { HttpError } from '../errors/HttpError';
import { VerifyFunction } from 'passport-local';

export class UserService {
  /**
   * Function for signing in user by credentials
   * Check if user with given email exists in DB
   * and compare his password with given
   *
   * @param username
   * @param password
   * @param done
   * @return {Promise<any>}
   */
  public static async signIn (username: string, password: string, done: any) {
    const user = await User.findOne({ email: username }).select('+password');

    if (!user) {
      const err = new HttpError(401,'User with such email not found');
      return done(err, false);
    }
    const isPassCorrect = await user.comparePass(password);

    if (!isPassCorrect) {
      const err = new HttpError(401, 'Password is incorrect');
      err.status = 401;
      done(err, false);
    }

    const userJson = user.toJSON();
    done(null, userJson);
  }
}
