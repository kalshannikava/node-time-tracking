import BaseService from './baseService';
import type TeamsRepository from '../repositories/teams.repository';
import type { CreateTeamData, UpdateTeamData, Team } from '../types/team';

class TeamsService extends BaseService<Team, CreateTeamData, UpdateTeamData> {
  constructor (repository: TeamsRepository) {
    super(repository);
  }

  public async create(data: CreateTeamData): Promise<Team> {
    if (!data.logo || !data.name) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default TeamsService;
