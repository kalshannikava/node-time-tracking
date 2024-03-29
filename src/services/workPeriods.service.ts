import { DeepPartial } from 'typeorm';

import BaseService from './base.service';
import type WorkPeriodsRepository from '../repositories/workPeriods.repository';
import { WorkPeriod } from '../entities/WorkPeriod.entity';

type WorkPeriodsServiceContext = {
  workPeriodsRepository: WorkPeriodsRepository,
}

class WorkPeriodsService extends BaseService<WorkPeriod> {
  constructor ({ workPeriodsRepository }: WorkPeriodsServiceContext) {
    super({ repository: workPeriodsRepository });
  }

  public async create(data: DeepPartial<WorkPeriod>): Promise<WorkPeriod> {
    if (!data.from || !data.to || !data.weekDays || !data.teamId || !data.userId) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default WorkPeriodsService;
