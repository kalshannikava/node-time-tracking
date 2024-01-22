import { Response, NextFunction } from 'express';

import type DataBase from '../db';
import type { Team } from '../types/team';
import type { RequestWithID } from '../types/shared';

class TeamsMiddleware {
  private database: DataBase;

  constructor (database: DataBase) {
    this.database = database;
  }

  public async checkIfTeamExists (req: RequestWithID, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);
    try {
      const [index, team]: [number, Team] = await this.database.getTeamById(id);
      req.index = index;
      req.entity = team;
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
    next();
  }
}

export default TeamsMiddleware;
