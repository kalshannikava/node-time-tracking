import http, { Server } from 'http';

import { container, setupContainer } from './containers';
import app from './app';
import type { RoutesConfig } from './types/app';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
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
      },
      auth: {
        middleware: container.resolve('authMiddleware'),
        controller: container.resolve('authController'),
      }
    }

    const PORT: number = Number(process.env.PORT) || 8000;
    const application = app({
      routesConfig,
      appDataSource: AppDataSource,
      usersService: container.resolve('usersService'),
    });
    const server: Server = http.createServer(application);

    server.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  })
  .catch((error) => console.log(error));
