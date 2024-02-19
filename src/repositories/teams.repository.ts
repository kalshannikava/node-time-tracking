import type { DataSource } from 'typeorm';

import BaseRepository from './base.repository';
import { Team } from '../entities/Team.entity';

type TeamsRepositoryContext = {
  dataSource: DataSource,
}

class TeamsRepository extends BaseRepository<Team> {
  constructor ({ dataSource }: TeamsRepositoryContext) {
    super({ repository: dataSource.getRepository(Team) });
  }
}

export default TeamsRepository;
