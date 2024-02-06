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

function setupContainers(filepath: string) {
  const filename = awilix.asValue(filepath);
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

  usersContainer.register({
    filename,
    db,
    usersRepository,
    usersService,
    usersMiddleware,
    usersController,
  });

  teamsContainer.register({
    filename,
    db,
    teamsRepository,
    teamsService,
    teamsMiddleware,
    teamsController,
  });

  workPeriodsContainer.register({
    filename,
    db,
    workPeriodsRepository,
    usersRepository,
    teamsRepository,
    workPeriodsService,
    workPeriodsMiddleware,
    workPeriodsController,
  });
}

export {
  usersContainer,
  teamsContainer,
  workPeriodsContainer,
  setupContainers,
}