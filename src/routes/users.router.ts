import { Router } from 'express';

import type UsersMiddleware from '../middleware/users.middleware';
import type UsersController from '../controllers/users.controller';

function usersRouter (usersController: UsersController, usersMiddleware: UsersMiddleware): Router {
  const router: Router = Router();

  // Validation
  router.use('/:id', usersMiddleware.checkIfUserExists.bind(usersMiddleware));
  router.use('/', usersMiddleware.validateEmail.bind(usersMiddleware));

  // Routes
  router.get('/', usersController.getAll.bind(usersController));
  router.get('/:id', usersController.get.bind(usersController));
  router.post('/', usersController.create.bind(usersController));
  router.delete('/:id', usersController.delete.bind(usersController));
  router.put('/:id', usersController.update.bind(usersController));

  return router;
}

export default usersRouter;
