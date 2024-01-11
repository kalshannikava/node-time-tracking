import { Request } from 'express';

export type User = {
  id: number,
  name: string,
  email: string,
  timezone: string,
}

export interface GetUserRequest extends Request<{ id: string }> {}

export interface CreateUserRequest extends Request {
  body: Omit<User, 'id'>,
}

export interface UpdateUserRequest extends Request <{ id: string }> {
  body: Partial<Omit<User, 'id'>>,
}

export interface DeleteUserRequest extends Request<{ id: string }> {}
