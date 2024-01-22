import type DataBase from '../db';
import type { CreateTeamData, Team, UpdateTeamData } from '../types/team';

class TeamsService {
  private database: DataBase;

  constructor (database: DataBase) {
    this.database = database;
  }

  public async getTeams (): Promise<Team[]> {
    return await this.database.getTeams();
  }

  public async createTeam (teamData: CreateTeamData): Promise<Team> {
    const lastTeam: Team = await this.database.getTeam(-1);
    const team: Team = {
      ...teamData,
      id: lastTeam.id + 1,
    };
    if (!team.logo || !team.name) {
      throw new Error('Missing required property');
    }
    await this.database.addTeam(team);
    return team;
  }

  public async deleteTeam (index: number): Promise<void> {
    await this.database.deleteTeam(index);
  }

  public async updateUser (index: number, team: Team, newTeamData: UpdateTeamData): Promise<Team> {
    const { name, logo } = newTeamData;
    const updatedTeam: Team = {
      ...team,
      ...name && { name },
      ...logo && { logo },
    };
    await this.database.updateTeam(index, updatedTeam);
    return updatedTeam;
  }
}

export default TeamsService;
