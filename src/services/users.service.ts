import type DataBase from '../db';
import type { CreateUserData, UpdateUserData, User } from '../types/user';

class UserService {
  private database: DataBase;

  constructor (database: DataBase) {
    this.database = database;
  }

  public async getAll (): Promise<User[]> {
    return this.database.getUsers();
  }

  public async create (userData: CreateUserData): Promise<User> {
    const lastUser: User = await this.database.getUser(-1);
    const user: User = {
      ...userData,
      id: lastUser.id + 1,
    };
    if (!user.email || !user.name || !user.timezone) {
      throw new Error('Missing required property');
    }
    await this.database.addUser(user);
    return user;
  }

  public async delete (index: number): Promise<void> {
    return this.database.deleteUser(index);
  }

  public async update (index: number, user: User, newUserData: UpdateUserData): Promise<User> {
    const updatedUser: User = {
      ...user,
      ...newUserData,
    };
    await this.database.updateUser(index, updatedUser);
    return updatedUser;
  }
}

export default UserService;
