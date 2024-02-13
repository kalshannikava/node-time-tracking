import BaseRepository from './base.repository';
import type { User } from '../types/user';
import type { DataBaseType } from '../types/database';

type UsersRepositoryContext = {
  db: DataBaseType,
}

class UsersRepository extends BaseRepository<User> {
  constructor ({ db }: UsersRepositoryContext) {
    super({ collection: 'users', db });
  }
}

export default UsersRepository;
