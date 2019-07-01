import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import middleware from './middleware';
const router = express();

process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});

applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 5000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}...`)
);
