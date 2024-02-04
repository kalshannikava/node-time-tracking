import { Request, Response } from 'express';

import type UserService from '../services/users.service';
import type { CreateUserRequest, DeleteUserRequest, GetUserRequest, UpdateUserRequest, User } from '../types/user';

class UsersController {
  private userService: UserService;

  constructor (userService: UserService) {
    this.userService = userService;
  }

  public async getAll (_req: Request, res: Response) {
    const data: User[] = await this.userService.getAll();
    return res.status(200).json(data);
  }
  
  public async get (req: GetUserRequest, res: Response) {
    return res.status(200).json(req.user);
  }
  
  public async create (req: CreateUserRequest, res: Response) {
    try {
      const user: User = await this.userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  public async delete (req: DeleteUserRequest, res: Response) {
    await this.userService.delete(req.index);
    return res.status(200).json(req.user);
  }
  
  public async update (req: UpdateUserRequest, res: Response) {
    const updatedUser: User = await this.userService.update(req.index, req.user, req.body);
    res.status(200).json(updatedUser);
  }
}

export default UsersController;
