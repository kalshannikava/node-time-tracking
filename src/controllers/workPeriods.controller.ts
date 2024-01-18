import { Request, Response } from 'express';

import WorkPeriodService from '../services/workPeriods.service';
import type { CreateWorkPeriodRequest, DeleteWorkPeriodRequest, GetWorkPeriodRequest, UpdateWorkPeriodRequest, WorkPeriod } from '../types/workPeriod';

async function getWorkPeriod (req: GetWorkPeriodRequest, res: Response) {
  return res.status(200).json(req.entity);
}

async function getWorkPeriods (_req: Request, res: Response) {
  const data: WorkPeriod[] = await WorkPeriodService.getWorkPeriods();
  return res.status(200).json(data);
}

async function createWorkPeriod (req: CreateWorkPeriodRequest, res: Response) {
  try {
    const workPeriod: WorkPeriod = await WorkPeriodService.createWorkPeriod(req.body);
    return res.status(201).json(workPeriod);
  } catch (error) {
    return res.status(400).json({ error: error. message });
  }
}

async function deleteWorkPeriod (req: DeleteWorkPeriodRequest, res: Response) {
  await WorkPeriodService.deleteWorkPeriod(req.index);
  return res.status(200).json(req.entity);
}

async function updateWorkPeriod (req: UpdateWorkPeriodRequest, res: Response) {
  const updatedWorkPeriod: WorkPeriod = await WorkPeriodService.updateWorkPeriod(req.index, req.entity as WorkPeriod, req.body);
  return res.status(200).json(updatedWorkPeriod);
}

export {
  getWorkPeriod,
  getWorkPeriods,
  createWorkPeriod,
  deleteWorkPeriod,
  updateWorkPeriod,
}