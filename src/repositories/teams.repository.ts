import BaseRepository from './base.repository';
import type { Team } from '../types/team';
import type { DataBaseType } from '../types/database';

class TeamsRepository extends BaseRepository<Team> {
  constructor (db: DataBaseType) {
    super('teams', db);
  }
}

export default TeamsRepository;
