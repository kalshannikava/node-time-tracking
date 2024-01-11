import { Request } from 'express';

export type User = {
  id: number,
  name: string,
  email: string,
  timezone: string,
}

export interface CreateUserRequest extends Request {
  body: Omit<User, 'id'>,
}

export type DeleteUserRequest = Request<{ id: string }>;
