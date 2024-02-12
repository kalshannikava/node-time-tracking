import { DeepPartial } from 'typeorm';

import BaseService from './baseService';
import type WorkPeriodsRepository from '../repositories/workPeriods.repository';
import { WorkPeriod } from '../entity/WorkPeriod';

type WorkPeriodsServiceContext = {
  workPeriodsRepository: WorkPeriodsRepository,
}

class WorkPeriodsService extends BaseService<WorkPeriod> {
  constructor ({ workPeriodsRepository }: WorkPeriodsServiceContext) {
    super({ repository: workPeriodsRepository });
  }

  public async create(data: DeepPartial<WorkPeriod>): Promise<WorkPeriod> {
    if (!data.from || !data.to || !data.weekDays || !data.teamId && data.teamId !== 0 || !data.userId && data.userId != 0) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default WorkPeriodsService;
