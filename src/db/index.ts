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

  /* Teams */
  public async writeTeam (data: Team[]): Promise<void> {
    return await DataBase.db.push('/teams', data);
  }

  public async getTeams (): Promise<Team[]> {
    return await DataBase.db.getObject<Team[]>('/teams');
  }

  public async getTeam (index: number): Promise<Team> {
    return await DataBase.db.getObject<Team>(`/teams[${index}]`)
  }

  public async addTeam (team: Team): Promise<void> {
    return await DataBase.db.push('/teams[]', team);
  }

  public async deleteTeam (index: number): Promise<void> {
    return await DataBase.db.delete(`/teams[${index}]`);
  }

  public async updateTeam (index: number, updatedTeam: Team): Promise<void> {
    return await DataBase.db.push(`/teams[${index}]`, updatedTeam, true);
  }

  public async getTeamIndexById (id: number): Promise<number> {
    return await DataBase.db.getIndex('/teams', id, 'id');
  }

  public async getTeamById (id: number): Promise<[number, Team]> {
    const index: number = await DataBase.db.getIndex('/teams', id, 'id');
    if (index === -1) {
      throw new Error('Team not found');
    }
    return [index, await this.getTeam(index)];
  }
}

export default DataBase;
