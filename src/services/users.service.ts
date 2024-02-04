import BaseService from './baseService';
import type UserRepository from '../repositories/userRepository';
import type { CreateUserData, UpdateUserData, User } from '../types/user';

type Config = {
  usersRepository: UserRepository,
}

class UserService extends BaseService<User, CreateUserData, UpdateUserData> {
  constructor ({ usersRepository }: Config) {
    super({ repository: usersRepository });
  }

  public async create(data: CreateUserData): Promise<User> {
    if (!data.email || !data.name || !data.timezone) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default UserService;
