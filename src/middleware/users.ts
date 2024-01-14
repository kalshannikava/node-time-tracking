import { Request, Response, NextFunction } from 'express';

import { validate } from 'email-validator';
import db from '../db';
import { RequestWithID } from '../types/shared';

async function checkIfUserExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  const index: number = await db.getIndex('/users', id, 'id');
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  req.index = index;
  next();
}

function validateEmail (req: Request, res: Response, next: NextFunction) {
  if (req.body.email && !validate(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  next();
}

export {
  checkIfUserExists,
  validateEmail,
}