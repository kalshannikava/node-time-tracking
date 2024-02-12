import { Request, Response, NextFunction } from 'express';
import { validate } from 'email-validator';
import type { User } from '../entity/User';
import type { RequestWithID } from '../types/shared';
import type UsersRepository from '../repositories/users.repository';

type UsersMiddlewareContext = {
  usersRepository: UsersRepository,
}

class UsersMiddleware {
  private usersRepository: UsersRepository;

  constructor ({ usersRepository }: UsersMiddlewareContext) {
    this.usersRepository = usersRepository;
  }

  public async checkIfUserExists (req: RequestWithID, res: Response, next: NextFunction) {
  const id: number = Number(req.params.id);
  const user: User = await this.usersRepository.get(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  req.entity = user;
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
