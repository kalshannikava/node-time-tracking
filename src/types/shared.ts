import { Request } from 'express';
import type { User } from '../entities/User.entity';
import type { Team } from '../entities/Team.entity';
import type { WorkPeriod } from '../entities/WorkPeriod.entity';

export interface RequestWithID extends Request<{ id: string }> {
  entity: User | Team | WorkPeriod;
}

export type DoneFunction = (error: unknown, user?: User | boolean | number) => void;
