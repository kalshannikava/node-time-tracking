import { join } from 'path';
import { JsonDB, Config } from 'node-json-db';
import type { User } from '../types/user';
import type { Team } from '../types/team';

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

  /* Users */
  public static async writeUsers (data: User[]): Promise<void> {
    return await this.db.push('/users', data);
  }

  public static async getUsers (): Promise<User[]> {
    return await this.db.getObject<User[]>('/users');
  }

  public static async getUser (index: number): Promise<User> {
    return await this.db.getObject<User>(`/users[${index}]`)
  }

  public static async addUser (user: User): Promise<void> {
    return await this.db.push('/users[]', user);
  }

  public static async deleteUser (index: number): Promise<void> {
    return await this.db.delete(`/users[${index}]`);
  }

  public static async updateUser (index: number, updatedUser: User): Promise<void> {
    return await this.db.push(`/users[${index}]`, updatedUser, true);
  }

  public static async getUserIndexById (id: number): Promise<number> {
    return await this.db.getIndex('/users', id, 'id');
  }

  public static async getUserById (id: number): Promise<[number, User]> {
    const index: number = await this.db.getIndex('/users', id, 'id');
    if (index === -1) {
      throw new Error('User not found');
    }
    return [index, await DataBase.getUser(index)];
  }

  /* Teams */
  public static async writeTeam (data: Team[]): Promise<void> {
    return await this.db.push('/teams', data);
  }

  public static async getTeams (): Promise<Team[]> {
    return await this.db.getObject<Team[]>('/teams');
  }

  public static async getTeam (index: number): Promise<Team> {
    return await this.db.getObject<Team>(`/teams[${index}]`)
  }

  public static async addTeam (team: Team): Promise<void> {
    return await this.db.push('/teams[]', team);
  }

  public static async deleteTeam (index: number): Promise<void> {
    return await this.db.delete(`/teams[${index}]`);
  }

  public static async updateTeam (index: number, updatedTeam: Team): Promise<void> {
    return await this.db.push(`/teams[${index}]`, updatedTeam, true);
  }

  public static async getTeamIndexById (id: number): Promise<number> {
    return await this.db.getIndex('/teams', id, 'id');
  }

  public static async getTeamById (id: number): Promise<[number, Team]> {
    const index: number = await this.db.getIndex('/teams', id, 'id');
    if (index === -1) {
      throw new Error('Team not found');
    }
    return [index, await DataBase.getTeam(index)];
  }
}

export default DataBase;