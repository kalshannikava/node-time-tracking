import BaseRepository from './base.repository';
import type { WorkPeriod } from '../types/workPeriod';
import type { DataBaseType } from '../types/database';

type Config = {
  db: DataBaseType,
}

class WorkPeriodsRepository extends BaseRepository<WorkPeriod> {
  constructor ({ db }: Config) {
    super({ collection: 'workPeriods', db });
  }
}

export default WorkPeriodsRepository;
