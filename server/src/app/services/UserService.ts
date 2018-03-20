import { User } from '../models';
import { HttpError } from '../errors/HttpError';
import jsonwebtoken from 'jsonwebtoken';
import config from '../config/config';
import { IUserModel } from '../interfaces/models/IUser';

export class UserService {
  public static createUser (input: IUserModel) {
    const user = new User(input);

    return user.save();
  }

  public static getAllUsers () {
    return User.find({});
  }
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
      return done(err, false);
    }

    const userJson = user.toJSON();
    delete userJson.password;
    return done(null, userJson);
  }

  public static generateToken (user: any) {
    return jsonwebtoken.sign(user, config.jwt.secret, {
      expiresIn: config.jwt.expires
    });
  }
}
