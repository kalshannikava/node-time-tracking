import { Request } from 'express';
import { User } from './user';
import { Team } from './team';

export type DataInput = User[] | Team[];

export type DBRoutes = '/' | '/users' | '/teams' | '/workPeriods';

export interface RequestWithID extends Request<{ id: string }> {
  index: number;
}
