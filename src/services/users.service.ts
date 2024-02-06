import type DataBase from '../db';
import type { CreateUserData, UpdateUserData, User } from '../types/user';

class UserService {
  private database: DataBase;

  constructor (database: DataBase) {
    this.database = database;
  }

  public async getUsers (): Promise<User[]> {
    return await this.database.getUsers();
  }

  public async createUser (userData: CreateUserData): Promise<User> {
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

  public async deleteUser (index: number): Promise<void> {
    await this.database.deleteUser(index);
  }

  public async updateUser (index: number, user: User, newUserData: UpdateUserData): Promise<User> {
    const updatedUser: User = {
      ...user,
      ...newUserData,
    };
    await this.database.updateUser(index, updatedUser);
    return updatedUser;
  }
}

export default UserService;
