import http from 'http';
import { IApp } from './app/interfaces/IApp';
import { Database } from './app/config/mongoose';

export class Server {
  private server: http.Server;
  private port: number;

  constructor (app: IApp, port: number) {
    this.server = http.createServer(app.init());
    this.port = port;
  }

  public start () {
    try {
      const db = new Database();
      db.connect();
      this.server.listen(this.port);
      console.log(`Server running on port ${this.port}`);
    } catch (error) {
      console.log('Database connection failed on startup.');
    }
  }
}
