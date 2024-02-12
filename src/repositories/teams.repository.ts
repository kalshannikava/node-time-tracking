import type { DataSource } from 'typeorm';

import BaseRepository from './base.repository';
import { Team } from '../entity/Team';

type TeamsRepositoryConfig = {
  dataSource: DataSource,
}

class TeamsRepository extends BaseRepository<Team> {
  constructor ({ dataSource }: TeamsRepositoryConfig) {
    super({ repository: dataSource.getRepository(Team) });
  }
}

export default TeamsRepository;
