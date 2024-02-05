import BaseService from './baseService';
import type TeamsRepository from '../repositories/teams.repository';
import type { CreateTeamData, UpdateTeamData, Team } from '../types/team';

type Config = {
  teamsRepository: TeamsRepository,
}

class TeamsService extends BaseService<Team, CreateTeamData, UpdateTeamData> {
  constructor ({ teamsRepository }: Config) {
    super({ repository: teamsRepository });
  }

  public async create(data: CreateTeamData): Promise<Team> {
    if (!data.logo || !data.name) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default TeamsService;
