import http from 'http';
import { IApp } from './app/interfaces/IApp';

export class Server {
  private server: http.Server;
  private port: number;

  constructor (app: IApp, port: number) {
    this.server = http.createServer(app.init());
    this.port = port;
  }

  public start () {
    this.server.listen(this.port);
    console.log(`Server running on port ${this.port}`);
  }
}
