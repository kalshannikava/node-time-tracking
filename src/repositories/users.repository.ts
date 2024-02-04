import BaseRepository from './base.repository';
import type { User } from '../types/user';
import type { DataBaseType } from '../types/database';

type Config = {
  db: DataBaseType,
}

class UsersRepository extends BaseRepository<User> {
  constructor ({ db }: Config) {
    super({ collection: 'users', db });
  }
}

export default UsersRepository;
