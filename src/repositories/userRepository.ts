import BaseRepository from './baseRepository';
import type { User } from '../types/user';
import type { DataBaseType } from '../types/database';

class UserRepository extends BaseRepository<User> {
  constructor (db: DataBaseType) {
    super('users', db);
  }
}

export default UserRepository;
