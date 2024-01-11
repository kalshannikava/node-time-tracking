import { Request, Response } from 'express';
import { validate } from 'email-validator';

import db from '../db';
import { CreateUserRequest, User } from '../types/user';

async function getUsers (_req: Request, res: Response) {
  const data: User[] = await db.getObject<User[]>('/users');
  return res.status(200).json(data);
}

async function createUser (req: CreateUserRequest, res: Response) {
  const lastUser: User = await db.getObject<User>('/users[-1]');
  const user: User = {
    ...req.body,
    id: lastUser.id + 1,
  };
  if (!user.email || !user.name || !user.timezone) {
    return res.status(400).json({ error: 'Missing required property' });
  }
  if (!validate(user.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  await db.push('/users', [user], false);
  return res.status(201).json(user);
}

export {
  getUsers,
  createUser,
}