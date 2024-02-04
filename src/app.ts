import express, { Express } from 'express';

import { usersContainer, teamsContainer, workPeriodsContainer, setupContainers } from './containers';

import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import workPeriodsRouter from './routes/workPeriods.router';

function app (filename: string): Express {
  const application: Express = express();

  setupContainers(filename);

  application.use(express.json()); // parse body to json
  application.use('/workPeriods', workPeriodsRouter(workPeriodsContainer.resolve('controller'), workPeriodsContainer.resolve('middleware')));
  application.use('/teams', teamsRouter(teamsContainer.resolve('controller'), teamsContainer.resolve('middleware')));
  application.use('/users', usersRouter(usersContainer.resolve('controller'), usersContainer.resolve('middleware')));
  return application;
}

export default app;
