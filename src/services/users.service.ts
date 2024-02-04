import BaseService from './baseService';
import type UsersRepository from '../repositories/users.repository';
import type { CreateUserData, UpdateUserData, User } from '../types/user';

class UsersService extends BaseService<User, CreateUserData, UpdateUserData> {
  constructor (repository: UsersRepository) {
    super(repository);
  }

  public async create(data: CreateUserData): Promise<User> {
    if (!data.email || !data.name || !data.timezone) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default UsersService;
