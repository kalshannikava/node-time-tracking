import { Router } from 'express';
import passport from 'passport';

import type AuthController from '../controllers/auth.controller';

type AuthRouterContext = {
  auth: {
    controller: AuthController,
  }
}

function authRouter ({ auth }: AuthRouterContext): Router {
  const router: Router = Router();

  // Auth
  router.post('/login', passport.authenticate('local'), auth.controller.loginWithCredentials.bind(auth.controller));
  router.post('/signup', auth.controller.signupWithCredentials.bind(auth.controller));
  router.post('/logout', auth.controller.logoutWithCredentials.bind(auth.controller));

  return router;
}

export default authRouter;
