import { DeepPartial } from 'typeorm';

import BaseService from './baseService';
import type TeamsRepository from '../repositories/teams.repository';
import type { Team } from '../entity/Team';

type Config = {
  teamsRepository: TeamsRepository,
}

class TeamsService extends BaseService<Team> {
  constructor ({ teamsRepository }: Config) {
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
