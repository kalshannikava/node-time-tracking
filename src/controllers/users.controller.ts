import { Request, Response } from 'express';

import type UserService from '../services/users.service';
import type { CreateUserRequest, DeleteUserRequest, GetUserRequest, UpdateUserRequest, User } from '../types/user';

class UsersController {
  private userService: UserService;

  constructor (userService: UserService) {
    this.userService = userService;
  }

  public async getUsers (_req: Request, res: Response) {
    const data: User[] = await this.userService.getAll();
    return res.status(200).json(data);
  }
  
  public async getUser (req: GetUserRequest, res: Response) {
    return res.status(200).json(req.user);
  }
  
  public async createUser (req: CreateUserRequest, res: Response) {
    try {
      const user: User = await this.userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  public async deleteUser (req: DeleteUserRequest, res: Response) {
    await this.userService.delete(req.index);
    return res.status(200).json(req.user);
  }
  
  public async updateUser (req: UpdateUserRequest, res: Response) {
    const updatedUser: User = await this.userService.update(req.index, req.user, req.body);
    res.status(200).json(updatedUser);
  }
}


export default UsersController;
