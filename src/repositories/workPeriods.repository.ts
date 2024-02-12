import BaseRepository from './base.repository';
import type { WorkPeriod } from '../types/workPeriod';
import type { DataBaseType } from '../types/database';

type WorkPeriodsRepositoryContext = {
  db: DataBaseType,
}

class WorkPeriodsRepository extends BaseRepository<WorkPeriod> {
  constructor ({ db }: WorkPeriodsRepositoryContext) {
    super({ collection: 'workPeriods', db });
  }
}

export default WorkPeriodsRepository;
