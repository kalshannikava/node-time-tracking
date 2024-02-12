import type { DataSource } from 'typeorm';

import BaseRepository from './base.repository';
import { User } from '../entity/User';

type UsersRepositoryConfig = {
  dataSource: DataSource,
}

class UsersRepository extends BaseRepository<User> {
  constructor ({ dataSource }: UsersRepositoryConfig) {
    super({ repository: dataSource.getRepository(User) });
  }
}

export default UsersRepository;
