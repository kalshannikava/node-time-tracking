import { Router } from 'express';

import type UsersMiddleware from '../middleware/users.middleware';
import type UsersController from '../controllers/users.controller';
import type AuthMiddleware from '../middleware/auth.middleware';

type UsersRouterContext = {
  users: {
    controller: UsersController,
    middleware: UsersMiddleware,
  },
  auth: {
    middleware: AuthMiddleware,
  }
}

function usersRouter ({ 
  users,
  auth,
}: UsersRouterContext): Router {
  const router: Router = Router();

  // Validation
  router.use('/:id', users.middleware.checkIfUserExists.bind(users.middleware));
  router.use('/', users.middleware.validateEmail.bind(users.middleware));

  // Routes
  router.get('/', users.controller.getAll.bind(users.controller));
  router.get('/:id', users.controller.get.bind(users.controller));
  router.post('/', auth.middleware.isAuth, users.controller.create.bind(users.controller));
  router.delete('/:id', auth.middleware.isAuth, users.controller.delete.bind(users.controller));
  router.put('/:id', auth.middleware.isAuth, users.controller.update.bind(users.controller));

  return router;
}

export default usersRouter;
