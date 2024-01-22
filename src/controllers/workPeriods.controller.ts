import { Request, Response } from 'express';

import type WorkPeriodService from '../services/workPeriods.service';
import type { CreateWorkPeriodRequest, DeleteWorkPeriodRequest, GetWorkPeriodRequest, UpdateWorkPeriodRequest, WorkPeriod } from '../types/workPeriod';

class WorkPeriodsController {
  private workPeriodsService: WorkPeriodService;

  constructor (workPeriodsService: WorkPeriodService) {
    this.workPeriodsService = workPeriodsService;
  }

  public async getWorkPeriod (req: GetWorkPeriodRequest, res: Response) {
    return res.status(200).json(req.entity);
  }

  public async getWorkPeriods (_req: Request, res: Response) {
    const data: WorkPeriod[] = await this.workPeriodsService.getWorkPeriods();
    return res.status(200).json(data);
  }

  public async createWorkPeriod (req: CreateWorkPeriodRequest, res: Response) {
    try {
      const workPeriod: WorkPeriod = await this.workPeriodsService.createWorkPeriod(req.body);
      return res.status(201).json(workPeriod);
    } catch (error) {
      return res.status(400).json({ error: error. message });
    }
  }

  public async deleteWorkPeriod (req: DeleteWorkPeriodRequest, res: Response) {
    await this.workPeriodsService.deleteWorkPeriod(req.index);
    return res.status(200).json(req.entity);
  }

  public async updateWorkPeriod (req: UpdateWorkPeriodRequest, res: Response) {
    const updatedWorkPeriod: WorkPeriod = await this.workPeriodsService.updateWorkPeriod(req.index, req.entity as WorkPeriod, req.body);
    return res.status(200).json(updatedWorkPeriod);
  }
}


export default WorkPeriodsController;
