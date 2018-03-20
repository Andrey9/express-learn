import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config';

export class Database {
  private db: mongoose.Connection;
  private events: string[] = ['error', 'reconnected', 'connected', 'disconnected', 'closed'];

  constructor () {
    this.db = mongoose.connection;
  }

  public async connect () {
    mongoose.connect(config.db, { promiseLibrary: bluebird });
    this.db = mongoose.connection;
    this.setLogger();
  }

  private setLogger () {
    this.events.forEach((event) => {
      this.db.on(event, (msg) => {
        if (msg) {
          console.log(`Mongoose: ${event}\n`, msg);
        } else {
          console.log(`Mongoose: ${event}`);
        }
      });
    });
  }
}
