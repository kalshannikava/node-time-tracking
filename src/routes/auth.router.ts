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
  router.get('/logout', auth.controller.logoutWithCredentials.bind(auth.controller));

  router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

  router.get('/login/google/redirect', passport.authenticate('google'), auth.controller.googleCallback.bind(auth.controller));

  return router;
}

export default authRouter;
