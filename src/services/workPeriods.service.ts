import BaseService from './baseService';
import type WorkPeriodsRepository from '../repositories/workPeriods.repository';
import type { CreateWorkPeriodData, UpdateWorkPeriodData, WorkPeriod } from '../types/workPeriod';

type Config = {
  repository: WorkPeriodsRepository,
}

class WorkPeriodsService extends BaseService<WorkPeriod, CreateWorkPeriodData, UpdateWorkPeriodData> {
  constructor ({ repository }: Config) {
    super({ repository });
  }

  public async create(data: CreateWorkPeriodData): Promise<WorkPeriod> {
    if (!data.from || !data.to || !data.weekDays || !data.teamId && data.teamId !== 0 || !data.userId && data.userId != 0) {
      throw new Error('Missing required property');
    }
    return super.create(data);
  }
}

export default WorkPeriodsService;
