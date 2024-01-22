import type DataBase from '../db';
import type { CreateWorkPeriodData, UpdateWorkPeriodData, WorkPeriod } from '../types/workPeriod';

class WorkPeriodsService {
  private database: DataBase;

  constructor (database: DataBase) {
    this.database = database;
  }

  public async getWorkPeriods(): Promise<WorkPeriod[]> {
    return await this.database.getWorkPeriods();
  }

  public async createWorkPeriod (workPeriodData: CreateWorkPeriodData): Promise<WorkPeriod> {
    const lastWorkPeriod: WorkPeriod = await this.database.getWorkPeriod(-1);
    const workPeriod: WorkPeriod = {
      ...workPeriodData,
      id: lastWorkPeriod.id + 1,
    };
    if (!workPeriod.from || !workPeriod.to || !workPeriod.weekDays || !workPeriod.teamId || !workPeriod.userId) {
      throw new Error('Missing required property');
    }
    await this.database.addWorkPeriod(workPeriod);
    return workPeriod;
  }

  public async deleteWorkPeriod (index: number): Promise<void> {
    await this.database.deleteWorkPeriod(index);
  }

  public async updateWorkPeriod (index: number, workPeriod: WorkPeriod, newWorkPeriodData: UpdateWorkPeriodData): Promise<WorkPeriod> {
    const updatedWorkPeriod: WorkPeriod = {
      ...workPeriod,
      ...newWorkPeriodData,
    };
    await this.database.updateWorkPeriod(index, updatedWorkPeriod);
    return updatedWorkPeriod;
  }
}

export default WorkPeriodsService;
