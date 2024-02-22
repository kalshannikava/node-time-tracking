import { DeepPartial } from 'typeorm';

import BaseService from './base.service';
import type TeamsRepository from '../repositories/teams.repository';
import type { Team } from '../entities/Team.entity';

type TeamsServiceContext = {
  teamsRepository: TeamsRepository,
}

class TeamsService extends BaseService<Team> {
  constructor ({ teamsRepository }: TeamsServiceContext) {
    super({ repository: teamsRepository });
  }

  public async create(data: DeepPartial<Team>): Promise<Team> {
    if (!data.logo || !data.name) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default TeamsService;
