import { Request } from 'express';

export type Team = {
  id: number,
  name: string,
  logo: string,
}

export interface GetTeamRequest extends Request<{ id: string }> {}

export interface CreateTeamRequest extends Request {
  body: Omit<Team, 'id'>;
}

export interface UpdateTeamRequest extends Request<{ id: string }> {
  body: Partial<Omit<Team, 'id'>>;
}

export interface DeleteTeamRequest extends Request<{ id: string }> {}
