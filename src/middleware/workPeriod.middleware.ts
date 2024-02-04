import { Response, NextFunction } from 'express';

import type { CreateWorkPeriodRequest, UpdateWorkPeriodRequest, WorkPeriod } from '../types/workPeriod';
import type { RequestWithID } from '../types/shared';
import type WorkPeriodRepository from '../repositories/workPeriods.repository';
import type UserRepository from '../repositories/users.repository';
import type TeamRepository from '../repositories/teams.repository';

type Config = {
  workPeriodRepository: WorkPeriodRepository,
  userRepository: UserRepository,
  teamRepository: TeamRepository,
}

class WorkPeriodsMiddleware {
  private workPeriodRepository: WorkPeriodRepository;
  private userRepository: UserRepository;
  private teamRepository: TeamRepository;

  constructor ({ workPeriodRepository, userRepository, teamRepository }: Config) {
    this.workPeriodRepository = workPeriodRepository;
    this.userRepository = userRepository;
    this.teamRepository = teamRepository;
  }
  public async checkIfWorkPeriodExists (req: RequestWithID, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);
    const index: number = await this.workPeriodRepository.getIndex(id);
    if (index === -1) {
      return res.status(404).json({ error: 'Work period not found' });
    }
    const workPeriod: WorkPeriod = await this.workPeriodRepository.get(index);
    req.entity = workPeriod;
    req.index = index;
    next();
  }

  public async checkIfTeamOrUserExist (req: CreateWorkPeriodRequest | UpdateWorkPeriodRequest, res: Response, next: NextFunction) {
    const teamId: number = Number(req.body.teamId);
    const userId: number = Number(req.body.userId);
    
    if (userId) {
      const userIndex: number = await this.userRepository.getIndex(userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    if (teamId) {
      const teamIndex: number = await this.teamRepository.getIndex(teamId);
      if (teamIndex === -1) {
        return res.status(404).json({ error: 'Team not found' });
      }
    }
    next();
  }
}



export default WorkPeriodsMiddleware;
