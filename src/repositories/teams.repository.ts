import BaseRepository from './base.repository';
import type { Team } from '../types/team';
import type { DataBaseType } from '../types/database';

type Config = {
  db: DataBaseType,
}

class TeamsRepository extends BaseRepository<Team> {
  constructor ({ db }: Config) {
    super({ collection: 'teams', db });
  }
}

export default TeamsRepository;
