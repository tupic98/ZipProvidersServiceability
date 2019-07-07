import 'dotenv/config'
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import config from './ormconfig';
import MainController from './controllers/main.controller';

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  }catch (e) {
    console.log('Error while connecting to the database', e);
    return e;
  }
  const app = new App(
    [
      new MainController(),
    ],
  );
  app.listen();
})();
