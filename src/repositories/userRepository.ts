import BaseRepository from './baseRepository';
import type { User } from '../types/user';
import type { DataBaseType } from '../types/database';

type Config = {
  db: DataBaseType,
}

class UserRepository extends BaseRepository<User> {
  constructor ({ db }: Config) {
    super({ collection: 'users', db });
  }
}

export default UserRepository;
