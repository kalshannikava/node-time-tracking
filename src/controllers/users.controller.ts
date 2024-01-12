import { Request, Response } from 'express';

import db from '../db';
import { CreateUserRequest, DeleteUserRequest, GetUserRequest, UpdateUserRequest, User } from '../types/user';

async function getUsers (_req: Request, res: Response) {
  const data: User[] = await db.getObject<User[]>('/users');
  return res.status(200).json(data);
}

async function getUser (req: GetUserRequest, res: Response) {
  const data: User = await db.getObject<User>(`/users[${req.index}]`);
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
  await db.push('/users[]', user);
  return res.status(201).json(user);
}

async function deleteUser (req: DeleteUserRequest, res: Response) {
  const deleted: User = await db.getObject<User>(`/users[${req.index}]`);
  await db.delete(`/users[${req.index}]`);
  return res.status(200).json(deleted);
}

async function updateUser (req: UpdateUserRequest, res: Response) {
  const { name, email, timezone } = req.body;
  const user: User = await db.getObject<User>(`/users[${req.index}]`);
  const updatedUser: User = {
    ...user,
    ...name && { name },
    ...email && { email },
    ...timezone && { timezone },
  };
  await db.push(`/users[${req.index}]`, updatedUser, true); // 3rd param is set to override the data
  res.status(200).json(updatedUser);
}

export {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
}
