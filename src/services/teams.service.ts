import BaseService from './baseService';
import type TeamsRepository from '../repositories/teams.repository';
import type { CreateTeamData, UpdateTeamData, Team } from '../types/team';

type TeamsServiceContext = {
  teamsRepository: TeamsRepository,
}

class TeamsService extends BaseService<Team, CreateTeamData, UpdateTeamData> {
  constructor ({ teamsRepository }: TeamsServiceContext) {
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
