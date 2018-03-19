import { Server } from './server';
import { App } from './app';

const APP = new App();
const SERVER = new Server(APP, 8000);
SERVER.start();
