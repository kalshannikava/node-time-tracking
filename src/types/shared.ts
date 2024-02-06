import { Request } from 'express';
import type { User } from './user';
import type { Team } from './team';
import type { WorkPeriod } from './workPeriod';

export interface RequestWithID extends Request<{ id: string }> {
  index: number;
  entity: User | Team | WorkPeriod;
}
