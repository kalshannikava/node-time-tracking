import express, { Express } from 'express';

import usersRouter from './routes/users.router';
import { usersContainer, setupContainers } from './containers';

function app (filename: string): Express {
  const application: Express = express();

  setupContainers(filename);
  application.use(express.json()); // parse body to json
  application.use('/users', usersRouter(usersContainer.resolve('controller'), usersContainer.resolve('middleware')));

  return application;
}

export default app;
