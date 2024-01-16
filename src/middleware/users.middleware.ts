import { Request, Response, NextFunction } from 'express';

import { validate } from 'email-validator';
import DataBase from '../db';
import { RequestWithID, User } from '../types/user';

async function checkIfUserExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  try {
    const [index, user]: [number, User] = await DataBase.getUserById(id);
    req.user = user;
    req.index = index;
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
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