import BaseRepository from './base.repository';
import type { User } from '../types/user';
import type { DataBaseType } from '../types/database';

class UsersRepository extends BaseRepository<User> {
  constructor (db: DataBaseType) {
    super('users', db);
  }
}

export default UsersRepository;
