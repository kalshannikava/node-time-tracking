import { Router } from 'express';

import type WorkPeriodsController from '../controllers/workPeriods.controller';
import type WorkPeriodsMiddleware from '../middleware/workPeriod.middleware';

function workPeriodsRouter (workPeriodsController: WorkPeriodsController, workPeriodsMiddleware: WorkPeriodsMiddleware): Router {
  const router: Router = Router();

  // Validation
  router.use('/:id', workPeriodsMiddleware.checkIfWorkPeriodExists.bind(workPeriodsMiddleware));
  router.post('/', workPeriodsMiddleware.checkIfTeamOrUserExist.bind(workPeriodsMiddleware));
  router.put('/:id', workPeriodsMiddleware.checkIfTeamOrUserExist.bind(workPeriodsMiddleware));
  router.delete('/:id', workPeriodsMiddleware.checkIfTeamOrUserExist.bind(workPeriodsMiddleware));

  // Routes
  router.get('/', workPeriodsController.getWorkPeriods.bind(workPeriodsController));
  router.get('/:id', workPeriodsController.getWorkPeriod.bind(workPeriodsController));
  router.post('/', workPeriodsController.createWorkPeriod.bind(workPeriodsController));
  router.delete('/:id', workPeriodsController.deleteWorkPeriod.bind(workPeriodsController));
  router.put('/:id', workPeriodsController.updateWorkPeriod.bind(workPeriodsController)); 

  return router;
}

export default workPeriodsRouter;
