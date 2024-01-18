import { Response, NextFunction } from 'express';

import DataBase from '../db';
import type { CreateWorkPeriodRequest, UpdateWorkPeriodRequest, WorkPeriod } from '../types/workPeriod';
import type { RequestWithID } from '../types/shared';

async function checkIfWorkPeriodExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  try {
    const [index, workPeriod]: [number, WorkPeriod] = await DataBase.getWorkPeriodById(id);
    req.index = index;
    req.entity = workPeriod;
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  next();
}

async function checkIfTeamOrUserExist (req: CreateWorkPeriodRequest | UpdateWorkPeriodRequest, res: Response, next: NextFunction) {
  const teamId: number = Number(req.body.teamId);
  const userId: number = Number(req.body.userId);
  try {
    teamId && await DataBase.getTeamById(teamId);
    userId && await DataBase.getUserById(userId);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  next();
}

export {
  checkIfWorkPeriodExists,
  checkIfTeamOrUserExist,
}