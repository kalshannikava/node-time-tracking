import { Response, NextFunction } from 'express';

import DataBase from '../db';
import type { Team } from '../types/team';
import type { RequestWithID } from '../types/shared';

async function checkIfTeamExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  try {
    const [index, team]: [number, Team] = await DataBase.getTeamById(id);
    req.index = index;
    req.entity = team;
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  next();
}

export {
  checkIfTeamExists,
}