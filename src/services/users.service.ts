import DataBase from '../db';
import type { CreateUserData, UpdateUserData, User } from '../types/user';

class UserService {
  public static async getUsers (): Promise<User[]> {
    return await DataBase.getUsers();
  }

  public static async createUser (userData: CreateUserData): Promise<User> {
    const lastUser: User = await DataBase.getUser(-1);
    const user: User = {
      ...userData,
      id: lastUser.id + 1,
    };
    if (!user.email || !user.name || !user.timezone) {
      throw new Error('Missing required property');
    }
    await DataBase.addUser(user);
    return user;
  }

  public static async deleteUser (index: number): Promise<void> {
    await DataBase.deleteUser(index);
  }

  public static async updateUser (index: number, user: User, newUserData: UpdateUserData): Promise<User> {
    const { name, email, timezone } = newUserData;
    const updatedUser: User = {
      ...user,
      ...name && { name },
      ...email && { email },
      ...timezone && { timezone },
    };
    await DataBase.updateUser(index, updatedUser);
    return updatedUser;
  }
}

export default UserService;
