import http, { Server } from 'http';

import { container, setupContainer } from './containers';
import app from './app';
import { RoutesConfig } from './types/app';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

AppDataSource.initialize()
  .then(async () => {
    const users = await AppDataSource.manager.find(User);
    console.log('Loaded users: ', users);

    setupContainer(AppDataSource);

    const routesConfig: RoutesConfig = {
      workPeriods: {
        middleware: container.resolve('workPeriodsMiddleware'),
        controller: container.resolve('workPeriodsController'),
      },
      teams: {
        middleware: container.resolve('teamsMiddleware'),
        controller: container.resolve('teamsController'),
      },
      users: {
        middleware: container.resolve('usersMiddleware'),
        controller: container.resolve('usersController'),
      }
    }

    const PORT: number = Number(process.env.PORT) || 8000;
    const server: Server = http.createServer(app(routesConfig));

    server.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  })
  .catch((error) => console.log(error));
