import http, { Server } from 'http';
import { join } from 'path';

import { container, setupContainer } from './containers';
import app from './app';
import { RoutesConfig } from './types/app';

const dbPath: string = join(__dirname, 'db', 'db.json');
setupContainer(dbPath);

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
  console.log(`Listening on ${PORT}...`)
});
