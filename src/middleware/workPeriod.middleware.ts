import { Response, NextFunction } from 'express';

import type DataBase from '../db';
import type { CreateWorkPeriodRequest, UpdateWorkPeriodRequest, WorkPeriod } from '../types/workPeriod';
import type { RequestWithID } from '../types/shared';

class WorkPeriodsMiddleware {
  private database: DataBase;

  constructor (database: DataBase) {
    this.database = database;
  }
  public async checkIfWorkPeriodExists (req: RequestWithID, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);
    try {
      const [index, workPeriod]: [number, WorkPeriod] = await this.database.getWorkPeriodById(id);
      req.index = index;
      req.entity = workPeriod;
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
    next();
  }

  public async checkIfTeamOrUserExist (req: CreateWorkPeriodRequest | UpdateWorkPeriodRequest, res: Response, next: NextFunction) {
    const teamId: number = Number(req.body.teamId);
    const userId: number = Number(req.body.userId);
    try {
      teamId && await this.database.getTeamById(teamId);
      userId && await this.database.getUserById(userId);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
    next();
  }
}



export default WorkPeriodsMiddleware;
