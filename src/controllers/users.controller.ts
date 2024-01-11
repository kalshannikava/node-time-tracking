import { Request, Response } from 'express';
import { validate } from 'email-validator';

import db from '../db';
import { CreateUserRequest, DeleteUserRequest, UpdateUserRequest, User } from '../types/user';

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
  await db.push('/users[]', user, false);
  return res.status(201).json(user);
}

async function deleteUser (req: DeleteUserRequest, res: Response) {
  const id: number = Number(req.params.id);
  const index: number = await db.getIndex('/users', id, 'id');
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deleted: User = await db.getObject<User>(`/users[${index}]`);
  await db.delete(`/users[${index}]`);
  return res.status(200).json(deleted);
}

async function updateUser (req: UpdateUserRequest, res: Response) {
  const id: number = Number(req.params.id);
  const index: number = await db.getIndex('/users', id, 'id');
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { name, email, timezone } = req.body;
  if (email && !validate(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  const user: User = await db.getObject<User>(`/users[${index}]`);
  const updatedUser: User = {
    ...user,
    ...name && { name },
    ...email && { email },
    ...timezone && { timezone },
  };
  await db.push(`/users[${index}]`, updatedUser, true); // 3rd param is set to override the data
  res.status(200).json(updatedUser);
}

export {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
}
