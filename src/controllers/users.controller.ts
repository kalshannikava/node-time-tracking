import { Request, Response } from 'express';

import UserService from '../services/users.service';
import type { CreateUserRequest, DeleteUserRequest, GetUserRequest, UpdateUserRequest, User } from '../types/user';

async function getUsers (_req: Request, res: Response) {
  const data: User[] = await UserService.getUsers();
  return res.status(200).json(data);
}

async function getUser (req: GetUserRequest, res: Response) {
  return res.status(200).json(req.user);
}

async function createUser (req: CreateUserRequest, res: Response) {
  try {
    const user: User = await UserService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function deleteUser (req: DeleteUserRequest, res: Response) {
  await UserService.deleteUser(req.index);
  return res.status(200).json(req.user);
}

async function updateUser (req: UpdateUserRequest, res: Response) {
  const updatedUser: User = await UserService.updateUser(req.index, req.user, req.body);
  res.status(200).json(updatedUser);
}

export {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
}
