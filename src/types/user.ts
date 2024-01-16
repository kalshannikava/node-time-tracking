import { Request } from 'express';

export type User = {
  id: number,
  name: string,
  email: string,
  timezone: string,
}

export interface RequestWithID extends Request<{ id: string }> {
  index: number;
  user: User;
}

export interface GetUserRequest extends RequestWithID {}

export interface CreateUserRequest extends Request {
  body: Omit<User, 'id'>,
}

export interface UpdateUserRequest extends RequestWithID {
  body: Partial<Omit<User, 'id'>>,
}

export interface DeleteUserRequest extends RequestWithID {}
