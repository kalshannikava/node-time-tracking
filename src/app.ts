import express, { Express } from 'express';


import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import workPeriodsRouter from './routes/workPeriods.router';
import UsersService from './services/users.service';
import TeamsService from './services/teams.service';
import WorkPeriodsService from './services/workPeriods.service';
import UsersMiddleware from './middleware/users.middleware';
import TeamsMiddleware from './middleware/teams.middleware';
import WorkPeriodsMiddleware from './middleware/workPeriod.middleware';
import UsersController from './controllers/users.controller';
import TeamsController from './controllers/teams.controller';
import WorkPeriodsController from './controllers/workPeriods.controller';
import UsersRepository from './repositories/users.repository';
import TeamsRepository from './repositories/teams.repository';
import WorkPeriodsRepository from './repositories/workPeriods.repository';
import type { DataBaseType } from './types/database';

function app (db: DataBaseType): Express {
  const application: Express = express();

  const usersRepository: UsersRepository = new UsersRepository(db);
  const usersService: UsersService = new UsersService(usersRepository);
  const usersMiddleware: UsersMiddleware = new UsersMiddleware(usersRepository);
  const usersController: UsersController = new UsersController(usersService);

  const teamsRepository: TeamsRepository = new TeamsRepository(db);
  const teamsService: TeamsService = new TeamsService(teamsRepository);
  const teamsMiddleware: TeamsMiddleware = new TeamsMiddleware(teamsRepository);
  const teamsController: TeamsController = new TeamsController(teamsService);

  const workPeriodsRepository: WorkPeriodsRepository = new WorkPeriodsRepository(db);
  const workPeriodsService: WorkPeriodsService = new WorkPeriodsService(workPeriodsRepository);
  const workPeriodsMiddleware: WorkPeriodsMiddleware = new WorkPeriodsMiddleware({ workPeriodsRepository, teamsRepository, usersRepository });
  const workPeriodsController: WorkPeriodsController = new WorkPeriodsController(workPeriodsService);

  application.use(express.json()); // parse body to json
  application.use('/workPeriods', workPeriodsRouter(workPeriodsController, workPeriodsMiddleware));
  application.use('/teams', teamsRouter(teamsController, teamsMiddleware));
  application.use('/users', usersRouter(usersController, usersMiddleware));
  return application;
}

export default app;
