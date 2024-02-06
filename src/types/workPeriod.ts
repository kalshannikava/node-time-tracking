import type { Request } from 'express';
import type { RequestWithID } from './shared';

export type WorkPeriod = {
  id: number,
  from: string,
  to: string,
  weekDays: string,
  userId: number,
  teamId: number,
}

export interface GetWorkPeriodRequest extends RequestWithID {}

export type CreateWorkPeriodData = Omit<WorkPeriod, 'id'>;
export interface CreateWorkPeriodRequest extends Request {
  body: CreateWorkPeriodData;
}

export type UpdateWorkPeriodData = Partial<CreateWorkPeriodData>;
export interface UpdateWorkPeriodRequest extends RequestWithID {
  body: UpdateWorkPeriodData;
}

export interface DeleteWorkPeriodRequest extends RequestWithID {}
