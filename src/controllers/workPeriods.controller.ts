import { Request, Response } from 'express';

import type WorkPeriodsService from '../services/workPeriods.service';
import type { CreateWorkPeriodRequest, DeleteWorkPeriodRequest, GetWorkPeriodRequest, UpdateWorkPeriodRequest } from '../types/workPeriod';

type WorkPeriodsControllerContext = {
  workPeriodsService: WorkPeriodsService,
}

class WorkPeriodsController {
  private workPeriodsService: WorkPeriodsService;

  constructor ({ workPeriodsService }: WorkPeriodsControllerContext) {
    this.workPeriodsService = workPeriodsService;
  }

  public async getWorkPeriod (req: GetWorkPeriodRequest, res: Response) {
    return res.status(200).json(req.entity);
  }

  public async getWorkPeriods (_req: Request, res: Response) {
    const data = await this.workPeriodsService.getAll();
    return res.status(200).json(data);
  }

  public async createWorkPeriod (req: CreateWorkPeriodRequest, res: Response) {
    try {
      const workPeriod = await this.workPeriodsService.create(req.body);
      return res.status(201).json(workPeriod);
    } catch (error) {
      return res.status(400).json({ error: error. message });
    }
  }

  public async deleteWorkPeriod (req: DeleteWorkPeriodRequest, res: Response) {
    await this.workPeriodsService.delete(Number(req.params.id));
    return res.status(200).json(req.entity);
  }

  public async updateWorkPeriod (req: UpdateWorkPeriodRequest, res: Response) {
    const updatedWorkPeriod = await this.workPeriodsService.update(Number(req.params.id), req.body);
    return res.status(200).json(updatedWorkPeriod);
  }
}

export default WorkPeriodsController;
