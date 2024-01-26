import BaseRepository from './baseRepository';
import type { User } from '../types/user';
import type { DataBaseI } from '../types/database';

class UserRepository extends BaseRepository<User> {
  constructor (db: DataBaseI) {
    super('users', db);
  }
}

export default UserRepository;
