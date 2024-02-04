import express, { Express } from 'express';

import UserService from './services/users.service';
import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import workPeriodsRouter from './routes/workPeriods.router';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import TeamsController from './controllers/teams.controller';
import TeamsMiddleware from './middleware/teams.middleware';
import TeamsService from './services/teams.service';
import WorkPeriodsController from './controllers/workPeriods.controller';
import WorkPeriodsMiddleware from './middleware/workPeriod.middleware';
import WorkPeriodsService from './services/workPeriods.service';
import UserRepository from './repositories/userRepository';
import type { DataBaseType } from './types/database';
import TeamRepository from './repositories/teams.repository';

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

  const workPeriodsService: WorkPeriodsService = new WorkPeriodsService(db);
  const workPeriodsMiddleware: WorkPeriodsMiddleware = new WorkPeriodsMiddleware(db);
  const workPeriodsController: WorkPeriodsController = new WorkPeriodsController(workPeriodsService);

  application.use(express.json()); // parse body to json
  application.use('/workPeriods', workPeriodsRouter(workPeriodsController, workPeriodsMiddleware));
  application.use('/teams', teamsRouter(teamsController, teamsMiddleware));
  application.use('/users', usersRouter(usersController, usersMiddleware));
  return application;
}

export default app;
