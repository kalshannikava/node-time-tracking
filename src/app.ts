import express, { Express } from 'express';


import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import UserService from './services/users.service';
import TeamsService from './services/teams.service';
import UsersMiddleware from './middleware/users.middleware';
import TeamsMiddleware from './middleware/teams.middleware';
import UsersController from './controllers/users.controller';
import TeamsController from './controllers/teams.controller';
import UserRepository from './repositories/users.repository';
import TeamRepository from './repositories/teams.repository';
import type { DataBaseType } from './types/database';

function app (db: DataBaseType): Express {
  const application: Express = express();

  const userRepository: UserRepository = new UserRepository(db);
  const userService: UserService = new UserService(userRepository);
  const usersMiddleware: UsersMiddleware = new UsersMiddleware(userRepository);
  const usersController: UsersController = new UsersController(userService);

  const teamRepository: TeamRepository = new TeamRepository(db);
  const teamsService: TeamsService = new TeamsService(teamRepository);
  const teamsMiddleware: TeamsMiddleware = new TeamsMiddleware(teamRepository);
  const teamsController: TeamsController = new TeamsController(teamsService);

  application.use(express.json()); // parse body to json
  application.use('/teams', teamsRouter(teamsController, teamsMiddleware));
  application.use('/users', usersRouter(usersController, usersMiddleware));
  return application;
}

export default app;
