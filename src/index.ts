import http, { Server } from 'http';
import { join } from 'path';

import { usersContainer, teamsContainer, workPeriodsContainer, setupContainers } from './containers';
import app from './app';
import { RoutesConfig } from './types/app';

const dbPath: string = join(__dirname, 'db', 'db.json');
setupContainers(dbPath);

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
  console.log(`Listening on ${PORT}...`)
});
