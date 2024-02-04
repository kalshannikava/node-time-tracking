import UserService from './services/users.service';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import UsersRepository from './repositories/usersRepository';
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
    userService: awilix.asClass(UserService),
    middleware: awilix.asClass(UsersMiddleware),
    controller: awilix.asClass(UsersController),
  });
}

export {
  usersContainer,
  setupContainers,
}
