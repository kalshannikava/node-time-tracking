import { Router } from 'express';

import type UsersMiddleware from '../middleware/users.middleware';
import type UsersController from '../controllers/users.controller';

function usersRouter (usersController: UsersController, usersMiddleware: UsersMiddleware): Router {
  const router: Router = Router();

  // Validation
  router.use('/:id', usersMiddleware.checkIfUserExists.bind(usersMiddleware));
  router.use('/', usersMiddleware.validateEmail.bind(usersMiddleware));

  // Routes
  router.get('/', usersController.getUsers.bind(usersController));
  router.get('/:id', usersController.getUser.bind(usersController));
  router.post('/', usersController.createUser.bind(usersController));
  router.delete('/:id', usersController.deleteUser.bind(usersController));
  router.put('/:id', usersController.updateUser.bind(usersController));

  return router;
}

export default usersRouter;
