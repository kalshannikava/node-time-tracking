import http, { Server } from 'http';

import {
  usersContainer,
  teamsContainer,
  workPeriodsContainer,
  setupContainers,
} from './containers';
import app from './app';
import { RoutesConfig } from './types/app';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

AppDataSource.initialize()
  .then(async () => {
    const users = await AppDataSource.manager.find(User);
    console.log('Loaded users: ', users);

    setupContainers(AppDataSource);

    const routesConfig: RoutesConfig = {
      workPeriods: {
        middleware: workPeriodsContainer.resolve('workPeriodsMiddleware'),
        controller: workPeriodsContainer.resolve('workPeriodsController'),
      },
      teams: {
        middleware: teamsContainer.resolve('teamsMiddleware'),
        controller: teamsContainer.resolve('teamsController'),
      },
      users: {
        middleware: usersContainer.resolve('usersMiddleware'),
        controller: usersContainer.resolve('usersController'),
      }
    }

    const PORT: number = Number(process.env.PORT) || 8000;
    const server: Server = http.createServer(app(routesConfig));

    server.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  })
  .catch((error) => console.log(error));
