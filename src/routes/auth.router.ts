import { Router } from 'express';
import passport from 'passport';

import type AuthController from '../controllers/auth.controller';
import type AuthMiddleware from '../middleware/auth.middleware';

type AuthRouterContext = {
  auth: {
    controller: AuthController,
    middleware: AuthMiddleware,
  }
}

function authRouter ({ auth }: AuthRouterContext): Router {
  const router: Router = Router();

  // Auth
  router.post('/login',
    auth.middleware.checkLoginRequiredFields.bind(auth.middleware),
    passport.authenticate('local'),
    auth.controller.loginWithCredentials.bind(auth.controller),
  );
  router.post('/signup',
    auth.middleware.checkSignupRequiredFields.bind(auth.middleware),
    auth.controller.signupWithCredentials.bind(auth.controller),
  );
  router.post('/logout', auth.controller.logoutWithCredentials.bind(auth.controller));

  return router;
}

export default authRouter;
