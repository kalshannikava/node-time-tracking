import { Router } from 'express';

import type WorkPeriodsController from '../controllers/workPeriods.controller';
import type WorkPeriodsMiddleware from '../middleware/workPeriod.middleware';
import type AuthMiddleware from '../middleware/auth.middleware';

type WorkPeriodsRouterContext = {
  workPeriods: {
    controller: WorkPeriodsController,
    middleware: WorkPeriodsMiddleware,
  },
  auth: {
    middleware: AuthMiddleware,
  }
}

function workPeriodsRouter ({
  workPeriods,
  auth,
}: WorkPeriodsRouterContext): Router {
  const router: Router = Router();

  // Validation
  router.use('/:id', workPeriods.middleware.checkIfWorkPeriodExists.bind(workPeriods.middleware));
  router.post('/', workPeriods.middleware.checkIfTeamOrUserExist.bind(workPeriods.middleware));
  router.put('/:id', workPeriods.middleware.checkIfTeamOrUserExist.bind(workPeriods.middleware));
  router.delete('/:id', workPeriods.middleware.checkIfTeamOrUserExist.bind(workPeriods.middleware));

  // Routes
  router.get('/', workPeriods.controller.getWorkPeriods.bind(workPeriods.controller));
  router.get('/:id', workPeriods.controller.getWorkPeriod.bind(workPeriods.controller));
  router.post('/', auth.middleware.isAuth, workPeriods.controller.createWorkPeriod.bind(workPeriods.controller));
  router.delete('/:id', auth.middleware.isAuth, workPeriods.controller.deleteWorkPeriod.bind(workPeriods.controller));
  router.put('/:id', auth.middleware.isAuth, workPeriods.controller.updateWorkPeriod.bind(workPeriods.controller)); 

  return router;
}

export default workPeriodsRouter;
