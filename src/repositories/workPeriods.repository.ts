import type { DataSource } from 'typeorm';

import BaseRepository from './base.repository';
import { WorkPeriod } from '../entity/WorkPeriod';

type WorkPeriodsRepositoryContext = {
  dataSource: DataSource,
}

class WorkPeriodsRepository extends BaseRepository<WorkPeriod> {
  constructor ({ dataSource }: WorkPeriodsRepositoryContext) {
    super({ repository: dataSource.getRepository(WorkPeriod) });
  }
}

export default WorkPeriodsRepository;
