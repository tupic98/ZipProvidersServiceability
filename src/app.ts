import * as bodyParser from 'body-parser';
import express from 'express';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

const { PORT = 5000 } = process.env;

class App {
  private app!: express.Application;

  constructor(controllers: Controller[]){
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(PORT, () =>
      console.log(`Server is running in http://localhost:${PORT}...`)
    );
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]){
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
