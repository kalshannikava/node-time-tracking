import express, { Express } from 'express';

import UserService from './services/users.service';
import usersRouter from './routes/users.router';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import UserRepository from './repositories/userRepository';
import type { DataBaseType } from './types/database';

function app (db: DataBaseType): Express {
  const application: Express = express();

  const userRepository: UserRepository = new UserRepository(db);
  const userService: UserService = new UserService(userRepository);
  const usersMiddleware: UsersMiddleware = new UsersMiddleware(userRepository);
  const usersController: UsersController = new UsersController(userService);

  application.use(express.json()); // parse body to json
  application.use('/users', usersRouter(usersController, usersMiddleware));

  return application;
}

export default app;
