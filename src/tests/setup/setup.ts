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
      middleware: workPeriodsContainerTest.resolve('workPeriodsMiddleware'),
      controller: workPeriodsContainerTest.resolve('workPeriodsController'),
    },
    teams: {
      middleware: teamsContainerTest.resolve('teamsMiddleware'),
      controller: teamsContainerTest.resolve('teamsController'),
    },
    users: {
      middleware: usersContainerTest.resolve('usersMiddleware'),
      controller: usersContainerTest.resolve('usersController'),
    }
  };
}

function setupTestContainers(): RoutesConfig {
  const db = awilix.asClass(DataBase);
  const usersRepository = awilix.asClass(UsersRepository);
  const usersService = awilix.asClass(UsersService);
  const usersMiddleware = awilix.asClass(UsersMiddleware);
  const usersController = awilix.asClass(UsersController);
  const teamsRepository = awilix.asClass(TeamsRepository);
  const teamsService = awilix.asClass(TeamsService);
  const teamsMiddleware = awilix.asClass(TeamsMiddleware);
  const teamsController = awilix.asClass(TeamsController);
  const workPeriodsRepository = awilix.asClass(WorkPeriodsRepository)
  const workPeriodsService = awilix.asClass(WorkPeriodsService);
  const workPeriodsMiddleware = awilix.asClass(WorkPeriodsMiddleware);
  const workPeriodsController =  awilix.asClass(WorkPeriodsController);

  usersContainerTest.register({
    db,
    usersRepository,
    usersService,
    usersMiddleware,
    usersController,
  });

  teamsContainerTest.register({
    db,
    teamsRepository,
    teamsService,
    teamsMiddleware,
    teamsController,
  });

  workPeriodsContainerTest.register({
    db,
    workPeriodsRepository,
    usersRepository,
    teamsRepository,
    workPeriodsService,
    workPeriodsMiddleware,
    workPeriodsController,
  });

  return getTestRoutesConfig();
}

export {
  setupTestContainers,
};
