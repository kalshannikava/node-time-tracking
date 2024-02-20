import { Request, Response } from 'express';

import type UsersService from '../services/users.service';
import type { CreateUserRequest, DeleteUserRequest, GetUserRequest, UpdateUserRequest } from '../types/user';

type UsersControllerContext = {
  usersService: UsersService,
}

class UsersController {
  private usersService: UsersService;

  constructor ({ usersService } : UsersControllerContext) {
    this.usersService = usersService;
  }

  public async getAll (_req: Request, res: Response) {
    const data = await this.usersService.getAll();
    return res.status(200).json(data);
  }
  
  public async get (req: GetUserRequest, res: Response) {
    return res.status(200).json(req.entity);
  }
  
  public async create (req: CreateUserRequest, res: Response) {
    try {
      const user = await this.usersService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  public async delete (req: DeleteUserRequest, res: Response) {
    await this.usersService.delete(Number(req.params.id));
    return res.status(200).json(req.entity);
  }
  
  public async update (req: UpdateUserRequest, res: Response) {
    const updatedUser = await this.usersService.update(Number(req.params.id), req.body);
    res.status(200).json(updatedUser);
  }
}

export default UsersController;
