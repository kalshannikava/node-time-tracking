import type { DataSource } from 'typeorm';

import BaseRepository from './base.repository';
import { User } from '../entity/User';

type UsersRepositoryContext = {
  dataSource: DataSource,
}

class UsersRepository extends BaseRepository<User> {
  constructor ({ dataSource }: UsersRepositoryContext) {
    super({ repository: dataSource.getRepository(User) });
  }
}

export default UsersRepository;
