import UsersService from './services/users.service';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import UsersRepository from './repositories/users.repository';

import TeamsService from './services/teams.service';
import TeamsMiddleware from './middleware/teams.middleware';
import TeamsController from './controllers/teams.controller';
import TeamsRepository from './repositories/teams.repository';

import WorkPeriodsService from './services/workPeriods.service';
import WorkPeriodsMiddleware from './middleware/workPeriod.middleware';
import WorkPeriodsController from './controllers/workPeriods.controller';
import WorkPeriodsRepository from './repositories/workPeriods.repository';

import DataBase from './db/index';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const awilix = require('awilix');

const usersContainer = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

const teamsContainer = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

const workPeriodsContainer = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

function setupContainers(filename: string) {
  usersContainer.register({
    filename: awilix.asValue(filename),
    db: awilix.asClass(DataBase),
    usersRepository: awilix.asClass(UsersRepository),
    usersService: awilix.asClass(UsersService),
    middleware: awilix.asClass(UsersMiddleware),
    controller: awilix.asClass(UsersController),
  });

  teamsContainer.register({
    filename: awilix.asValue(filename),
    db: awilix.asClass(DataBase),
    teamsRepository: awilix.asClass(TeamsRepository),
    teamsService: awilix.asClass(TeamsService),
    middleware: awilix.asClass(TeamsMiddleware),
    controller: awilix.asClass(TeamsController),
  });

  workPeriodsContainer.register({
    filename: awilix.asValue(filename),
    db: awilix.asClass(DataBase),
    workPeriodsRepository: awilix.asClass(WorkPeriodsRepository),
    usersRepository: awilix.asClass(UsersRepository),
    teamsRepository: awilix.asClass(TeamsRepository),
    workPeriodsService: awilix.asClass(WorkPeriodsService),
    middleware: awilix.asClass(WorkPeriodsMiddleware),
    controller: awilix.asClass(WorkPeriodsController),
  });
}

export {
  usersContainer,
  teamsContainer,
  workPeriodsContainer,
  setupContainers,
}