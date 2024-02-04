import { Request } from 'express';
import { RequestWithID } from './shared';

export type User = {
  id: number,
  name: string,
  email: string,
  timezone: string,
}

export interface GetUserRequest extends RequestWithID {}

export type CreateUserData = Omit<User, 'id'>;
export interface CreateUserRequest extends Request {
  body: CreateUserData,
}

export type UpdateUserData = Partial<CreateUserData>;
export interface UpdateUserRequest extends RequestWithID {
  body: UpdateUserData,
}

export interface DeleteUserRequest extends RequestWithID {}
