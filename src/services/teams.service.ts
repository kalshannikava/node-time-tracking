import DataBase from '../db';
import type { CreateTeamData, Team, UpdateTeamData } from '../types/team';

class TeamsService {
  public static async getTeams (): Promise<Team[]> {
    return await DataBase.getTeams();
  }

  public static async createTeam (teamData: CreateTeamData): Promise<Team> {
    const lastTeam: Team = await DataBase.getTeam(-1);
    const team: Team = {
      ...teamData,
      id: lastTeam.id + 1,
    };
    if (!team.logo || !team.name) {
      throw new Error('Missing required property');
    }
    await DataBase.addTeam(team);
    return team;
  }

  public static async deleteTeam (index: number): Promise<void> {
    await DataBase.deleteTeam(index);
  }

  public static async updateUser (index: number, team: Team, newTeamData: UpdateTeamData): Promise<Team> {
    const { name, logo } = newTeamData;
    const updatedTeam: Team = {
      ...team,
      ...name && { name },
      ...logo && { logo },
    };
    await DataBase.updateTeam(index, updatedTeam);
    return updatedTeam;
  }
}

export default TeamsService;
