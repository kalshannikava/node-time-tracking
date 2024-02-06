import { Request } from 'express';
import { RequestWithID } from './shared';

export type Team = {
  id: number,
  name: string,
  logo: string,
}

export interface GetTeamRequest extends RequestWithID {}

export type CreateTeamData = Omit<Team, 'id'>;
export interface CreateTeamRequest extends Request {
  body: CreateTeamData;
}

export type UpdateTeamData = Partial<CreateTeamData>;
export interface UpdateTeamRequest extends RequestWithID {
  body: UpdateTeamData;
}

export interface DeleteTeamRequest extends RequestWithID {}
