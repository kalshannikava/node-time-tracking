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

  public getAll(): Promise<WorkPeriod[]> {
    return this.repository.find({ loadRelationIds: true });
  }

  public get(id: number): Promise<WorkPeriod> {
    return this.repository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }
}

export default WorkPeriodsRepository;
