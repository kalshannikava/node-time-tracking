import { Request } from 'express';
import type { User } from '../entity/User';
import type { Team } from '../entity/Team';
import type { WorkPeriod } from '../entity/WorkPeriod';

export interface RequestWithID extends Request<{ id: string }> {
  entity: User | Team | WorkPeriod;
}
