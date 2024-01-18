import DataBase from '../db';
import type { CreateWorkPeriodData, UpdateWorkPeriodData, WorkPeriod } from '../types/workPeriod';

class WorkPeriodService {
  public static async getWorkPeriods(): Promise<WorkPeriod[]> {
    return await DataBase.getWorkPeriods();
  }

  public static async createWorkPeriod (workPeriodData: CreateWorkPeriodData): Promise<WorkPeriod> {
    const lastWorkPeriod: WorkPeriod = await DataBase.getWorkPeriod(-1);
    const workPeriod: WorkPeriod = {
      ...workPeriodData,
      id: lastWorkPeriod.id + 1,
    };
    if (!workPeriod.from || !workPeriod.to || !workPeriod.weekDays || !workPeriod.teamId || !workPeriod.userId) {
      throw new Error('Missing required property');
    }
    await DataBase.addWorkPeriod(workPeriod);
    return workPeriod;
  }

  public static async deleteWorkPeriod (index: number): Promise<void> {
    await DataBase.deleteWorkPeriod(index);
  }

  public static async updateWorkPeriod (index: number, workPeriod: WorkPeriod, newWorkPeriodData: UpdateWorkPeriodData): Promise<WorkPeriod> {
    const updatedWorkPeriod: WorkPeriod = {
      ...workPeriod,
      ...newWorkPeriodData,
    };
    await DataBase.updateWorkPeriod(index, updatedWorkPeriod);
    return updatedWorkPeriod;
  }
}

export default WorkPeriodService;