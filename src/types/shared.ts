import { Request } from 'express';
import type { User } from './user';
import type { Team } from './team';

export type DataInput = User[];

export type DBRoutes = '/' | '/users' | '/teams' | '/workPeriods';

export interface RequestWithID extends Request<{ id: string }> {
  index: number;
  entity: User | Team;
}
