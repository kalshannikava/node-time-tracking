import { join } from 'path';
import { JsonDB, Config } from 'node-json-db';
import type { User } from '../types/user';

const filename: string = join(__dirname, 'db.json');

class DataBase {
  private static instance: DataBase;
  private static db: JsonDB;

  private constructor () {
    DataBase.db = new JsonDB(new Config(filename, true, true, '/'));
  }

  public static getInstance (): DataBase {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }

  public async writeUsers (data: User[]): Promise<void> {
    return await DataBase.db.push('/users', data);
  }

  public async getUsers (): Promise<User[]> {
    return await DataBase.db.getObject<User[]>('/users');
  }

  public async getUser (index: number): Promise<User> {
    return await DataBase.db.getObject<User>(`/users[${index}]`)
  }

  public async addUser (user: User): Promise<void> {
    return await DataBase.db.push('/users[]', user);
  }

  public async deleteUser (index: number): Promise<void> {
    return await DataBase.db.delete(`/users[${index}]`);
  }

  public async updateUser (index: number, updatedUser: User): Promise<void> {
    return await DataBase.db.push(`/users[${index}]`, updatedUser, true);
  }

  public async getUserIndexById (id: number): Promise<number> {
    return await DataBase.db.getIndex('/users', id, 'id');
  }

  public async getUserById (id: number): Promise<[number, User]> {
    const index: number = await DataBase.db.getIndex('/users', id, 'id');
    if (index === -1) {
      throw new Error('User not found');
    }
    return [index, await this.getUser(index)];
  }
}

export default DataBase;
