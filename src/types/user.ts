import { Request } from 'express';
import { RequestWithID } from './shared';

export type User = {
  id: number,
  name: string,
  email: string,
  timezone: string,
}

export interface GetUserRequest extends RequestWithID {}

export interface CreateUserRequest extends Request {
  body: Omit<User, 'id'>,
}

export interface UpdateUserRequest extends RequestWithID {
  body: Partial<Omit<User, 'id'>>,
}

export interface DeleteUserRequest extends RequestWithID {}
