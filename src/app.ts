import express, { Express } from 'express';

import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import workPeriodsRouter from './routes/workPeriods.router';
import type { RoutesConfig } from './types/app';

function app ({ workPeriods, teams, users }: RoutesConfig): Express {
  const application: Express = express();

  application.use(express.json()); // parse body to json

  application.use('/workPeriods', workPeriodsRouter(workPeriods.controller, workPeriods.middleware));
  application.use('/teams', teamsRouter(teams.controller, teams.middleware));
  application.use('/users', usersRouter(users.controller, users.middleware));

  return application;
}

export default app;
