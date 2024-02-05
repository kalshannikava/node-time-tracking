import http, { Server } from 'http';
import { join } from 'path';

import { usersContainer, teamsContainer, workPeriodsContainer, setupContainers } from './containers';
import app from './app';
import { RoutesConfig } from './types/app';

const dbPath: string = join(__dirname, 'db', 'db.json');
setupContainers(dbPath);

const routesConfig: RoutesConfig = {
  workPeriods: {
    middleware: workPeriodsContainer.resolve('middleware'),
    controller: workPeriodsContainer.resolve('controller'),
  },
  teams: {
    middleware: teamsContainer.resolve('middleware'),
    controller: teamsContainer.resolve('controller'),
  },
  users: {
    middleware: usersContainer.resolve('middleware'),
    controller: usersContainer.resolve('controller'),
  }
}

const PORT: number = Number(process.env.PORT) || 8000;
const server: Server = http.createServer(app(routesConfig));

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});
