import UsersService from '../../services/users.service';
import UsersMiddleware from '../../middleware/users.middleware';
import UsersController from '../../controllers/users.controller';
import UsersRepository from '../../repositories/users.repository';

import TeamsService from '../../services/teams.service';
import TeamsMiddleware from '../../middleware/teams.middleware';
import TeamsController from '../../controllers/teams.controller';
import TeamsRepository from '../../repositories/teams.repository';

import WorkPeriodsService from '../../services/workPeriods.service';
import WorkPeriodsMiddleware from '../../middleware/workPeriod.middleware';
import WorkPeriodsController from '../../controllers/workPeriods.controller';
import WorkPeriodsRepository from '../../repositories/workPeriods.repository';

import DataBase from '../mocks/mockDataBase';
import type { RoutesConfig } from '../../types/app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const awilix = require('awilix');

const usersContainerTest = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

const teamsContainerTest = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

const workPeriodsContainerTest = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
});

function getTestRoutesConfig(): RoutesConfig {
  return {
    workPeriods: {
      middleware: workPeriodsContainerTest.resolve('middleware'),
      controller: workPeriodsContainerTest.resolve('controller'),
    },
    teams: {
      middleware: teamsContainerTest.resolve('middleware'),
      controller: teamsContainerTest.resolve('controller'),
    },
    users: {
      middleware: usersContainerTest.resolve('middleware'),
      controller: usersContainerTest.resolve('controller'),
    },
  };
}

function setupTestContainers(): RoutesConfig {
  usersContainerTest.register({
    db: awilix.asClass(DataBase),
    usersRepository: awilix.asClass(UsersRepository),
    usersService: awilix.asClass(UsersService),
    middleware: awilix.asClass(UsersMiddleware),
    controller: awilix.asClass(UsersController),
  });

  teamsContainerTest.register({
    db: awilix.asClass(DataBase),
    teamsRepository: awilix.asClass(TeamsRepository),
    teamsService: awilix.asClass(TeamsService),
    middleware: awilix.asClass(TeamsMiddleware),
    controller: awilix.asClass(TeamsController),
  });

  workPeriodsContainerTest.register({
    db: awilix.asClass(DataBase),
    workPeriodsRepository: awilix.asClass(WorkPeriodsRepository),
    usersRepository: awilix.asClass(UsersRepository),
    teamsRepository: awilix.asClass(TeamsRepository),
    workPeriodsService: awilix.asClass(WorkPeriodsService),
    middleware: awilix.asClass(WorkPeriodsMiddleware),
    controller: awilix.asClass(WorkPeriodsController),
  });

  return getTestRoutesConfig();
}

export {
  setupTestContainers,
};
