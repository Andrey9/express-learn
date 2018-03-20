import passport from 'passport';
import { Strategy } from 'passport-local';
import { UserService } from '../services/UserService';

passport.use(
  new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
  }, UserService.signIn));

export default passport;
