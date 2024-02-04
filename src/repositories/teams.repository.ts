import BaseRepository from './baseRepository';
import type { Team } from '../types/team';
import type { DataBaseType } from '../types/database';

class TeamRepository extends BaseRepository<Team> {
  constructor (db: DataBaseType) {
    super('teams', db);
  }
}

export default TeamRepository;
