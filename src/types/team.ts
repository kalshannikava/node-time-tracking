import { Request } from 'express';
import { RequestWithID } from './shared';

export type Team = {
  id: number,
  name: string,
  logo: string,
}

export interface GetTeamRequest extends RequestWithID {}

export interface CreateTeamRequest extends Request {
  body: Omit<Team, 'id'>;
}

export interface UpdateTeamRequest extends RequestWithID {
  body: Partial<Omit<Team, 'id'>>;
}

export interface DeleteTeamRequest extends RequestWithID {}
