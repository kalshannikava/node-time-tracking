import { DeepPartial } from 'typeorm';

import BaseService from './baseService';
import type UsersRepository from '../repositories/users.repository';
import type { User } from '../entity/User';

type Config = {
  usersRepository: UsersRepository,
}

class UsersService extends BaseService<User> {
  constructor ({ usersRepository }: Config) {
    super({ repository: usersRepository });
  }

  public async create(data: DeepPartial<User>): Promise<User> {
    if (!data.email || !data.name || !data.timezone) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default UsersService;
