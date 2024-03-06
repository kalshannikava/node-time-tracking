import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import passport from 'passport';

import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import workPeriodsRouter from './routes/workPeriods.router';
import authRouter from './routes/auth.router';
import PassportLocal from './passport';
import createSession from './session';
import type { RoutesConfig } from './types/app';
import type UsersService from './services/users.service';

type AppContext = {
  routesConfig: RoutesConfig,
  appDataSource: DataSource,
  usersService: UsersService,
}

function app ({
  routesConfig: { workPeriods, teams, users, auth },
  appDataSource,
  usersService,
}: AppContext): Express {
  const application: Express = express();

  application.use(express.json()); // parse body to json

  const sessionHandler = createSession(appDataSource);
  application.use(sessionHandler);

  application.use(passport.initialize());
  application.use(passport.session());

  const passportLocal = new PassportLocal({ usersService });
  passportLocal.init();

  application.use('/', authRouter({ auth }));
  application.use('/workPeriods', workPeriodsRouter({ workPeriods, auth }));
  application.use('/teams', teamsRouter({ teams, auth }));
  application.use('/users', usersRouter({ users, auth }));

  return application;
}

export default app;
