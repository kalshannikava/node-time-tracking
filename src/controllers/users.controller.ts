import { Request, Response } from 'express';

import DataBase from '../db';
import { CreateUserRequest, DeleteUserRequest, GetUserRequest, UpdateUserRequest, User } from '../types/user';

async function getUsers (_req: Request, res: Response) {
  const data: User[] = await DataBase.getUsers();
  return res.status(200).json(data);
}

async function getUser (req: GetUserRequest, res: Response) {
  // const data: User = await DataBase.getUser(req.index);
  return res.status(200).json(req.user);
}

async function createUser (req: CreateUserRequest, res: Response) {
  const lastUser: User = await DataBase.getUser(-1);
  const user: User = {
    ...req.body,
    id: lastUser.id + 1,
  };
  if (!user.email || !user.name || !user.timezone) {
    return res.status(400).json({ error: 'Missing required property' });
  }
  await DataBase.addUser(user);
  return res.status(201).json(user);
}

async function deleteUser (req: DeleteUserRequest, res: Response) {
  // const deleted: User = await DataBase.getUser(req.index);
  await DataBase.deleteUser(req.index)
  return res.status(200).json(req.user);
}

async function updateUser (req: UpdateUserRequest, res: Response) {
  const { name, email, timezone } = req.body;
  // const user: User = await DataBase.getUser(req.index);
  const updatedUser: User = {
    ...req.user,
    ...name && { name },
    ...email && { email },
    ...timezone && { timezone },
  };
  await DataBase.updateUser(req.index, updatedUser);
  res.status(200).json(updatedUser);
}

export {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
}
