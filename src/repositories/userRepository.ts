import BaseRepository from './baseRepository';
import type { User } from '../types/user';
import type DataBase from '../db';

class UserRepository extends BaseRepository<User> {
  constructor (db: DataBase) {
    super('users', db);
  }
}

export default UserRepository;
