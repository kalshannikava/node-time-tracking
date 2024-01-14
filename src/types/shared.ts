import { Request } from 'express';
import { User } from './user';

export type DataInput = User[];

export type DBRoutes = '/' | '/users' | '/teams' | '/workPeriods';

export interface RequestWithID extends Request<{ id: string }> {
  index: number;
}
