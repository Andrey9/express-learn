import { Server } from './server';
import { App } from './app';
import config from './app/config/config';

const APP = new App();
const SERVER = new Server(APP, config.port);
SERVER.start();
