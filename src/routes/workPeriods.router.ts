import { Router } from 'express';

import { getWorkPeriods, getWorkPeriod, createWorkPeriod, deleteWorkPeriod, updateWorkPeriod } from '../controllers/workPeriods.controller';
import { checkIfTeamOrUserExist, checkIfWorkPeriodExists } from '../middleware/workPeriod.middleware';

const workPeriodsRouter: Router = Router();

// Validation
workPeriodsRouter.use('/:id', checkIfWorkPeriodExists);
workPeriodsRouter.use('/', checkIfTeamOrUserExist);

// Routes
workPeriodsRouter.get('/', getWorkPeriods);
workPeriodsRouter.get('/:id', getWorkPeriod);
workPeriodsRouter.post('/', createWorkPeriod);
workPeriodsRouter.delete('/:id', deleteWorkPeriod);
workPeriodsRouter.put('/:id', updateWorkPeriod);

export default workPeriodsRouter;