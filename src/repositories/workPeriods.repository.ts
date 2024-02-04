import BaseRepository from './base.repository';
import type { WorkPeriod } from '../types/workPeriod';
import type { DataBaseType } from '../types/database';

class WorkPeriodRepository extends BaseRepository<WorkPeriod> {
  constructor (db: DataBaseType) {
    super('workPeriods', db);
  }
}

export default WorkPeriodRepository;
