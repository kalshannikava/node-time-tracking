import UsersService from './services/users.service';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import UsersRepository from './repositories/users.repository';

import TeamsService from './services/users.service';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import UsersRepository from './repositories/users.repository';

import UsersService from './services/users.service';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import UsersRepository from './repositories/users.repository';
import DataBase from './db/index';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const awilix = require('awilix');

const usersContainer = awilix.createContainer({
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
}

export {
  usersContainer,
  setupContainers,
}