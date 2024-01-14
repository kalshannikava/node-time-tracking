import { Response, NextFunction } from 'express';
import { RequestWithID } from '../types/shared';
import db from '../db';

async function checkIfTeamExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  const index: number = await db.getIndex('/teams', id, 'id');
  if (index === -1) {
    return res.status(404).json({ error: 'Team not found' });
  }
  req.index = index;
  next();
}

export {
  checkIfTeamExists,
}