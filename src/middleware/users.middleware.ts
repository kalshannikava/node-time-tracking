import { Request, Response, NextFunction } from 'express';
import { validate } from 'email-validator';

import type DataBase from '../db';
import type { RequestWithID } from '../types/shared';
import type { User } from '../types/user'

class UsersMiddleware {
  private database: DataBase;

  constructor (database: DataBase) {
    this.database = database;
  }

  public async checkIfUserExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  try {
    const [index, user]: [number, User] = await this.database.getUserById(id);
    req.entity = user;
    req.index = index;
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  next();
}

public validateEmail (req: Request, res: Response, next: NextFunction) {
  if (req.body.email && !validate(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  next();
}
}

export default UsersMiddleware;