import { Request, Response, NextFunction } from 'express';

import { validate } from 'email-validator';
import type { RequestWithID, User } from '../types/user';
import type UserRepository from '../repositories/userRepository';

type Config = {
  usersRepository: UserRepository,
}

class UsersMiddleware {
  private usersRepository: UserRepository;

  constructor ({ usersRepository } : Config) {
    this.usersRepository = usersRepository;
  }

  public async checkIfUserExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  const index: number = await this.usersRepository.getIndex(id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const user: User = await this.usersRepository.get(index);
  req.user = user;
  req.index = index;
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