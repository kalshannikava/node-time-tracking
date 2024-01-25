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

export type CreateUserData = Omit<User, 'id'>;
export interface CreateUserRequest extends Request {
  body: CreateUserData,
}

export type UpdateUserData = Partial<CreateUserData>;
export interface UpdateUserRequest extends RequestWithID {
  body: UpdateUserData,
}

export interface DeleteUserRequest extends RequestWithID {}
