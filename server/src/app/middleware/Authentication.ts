import expressJwt from 'express-jwt';
import config from '../config/config';

export const auth = expressJwt(config.jwt);
