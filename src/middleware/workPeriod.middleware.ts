import { Response, NextFunction } from 'express';

import type { CreateWorkPeriodRequest, UpdateWorkPeriodRequest, WorkPeriod } from '../types/workPeriod';
import type { RequestWithID } from '../types/shared';
import type WorkPeriodsRepository from '../repositories/workPeriods.repository';
import type UsersRepository from '../repositories/users.repository';
import type TeamsRepository from '../repositories/teams.repository';

type Config = {
  workPeriodsRepository: WorkPeriodsRepository,
  usersRepository: UsersRepository,
  teamsRepository: TeamsRepository,
}

class WorkPeriodsMiddleware {
  private workPeriodsRepository: WorkPeriodsRepository;
  private usersRepository: UsersRepository;
  private teamsRepository: TeamsRepository;

  constructor ({ workPeriodsRepository, usersRepository, teamsRepository }: Config) {
    this.workPeriodsRepository = workPeriodsRepository;
    this.usersRepository = usersRepository;
    this.teamsRepository = teamsRepository;
  }
  public async checkIfWorkPeriodExists (req: RequestWithID, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);
    const index: number = await this.workPeriodsRepository.getIndex(id);
    if (index === -1) {
      return res.status(404).json({ error: 'Work period not found' });
    }
    const workPeriod: WorkPeriod = await this.workPeriodsRepository.get(index);
    req.entity = workPeriod;
    req.index = index;
    next();
  }

  public async checkIfTeamOrUserExist (req: CreateWorkPeriodRequest | UpdateWorkPeriodRequest, res: Response, next: NextFunction) {
    const teamId: number = Number(req.body.teamId);
    const userId: number = Number(req.body.userId);
    
    if (userId) {
      const userIndex: number = await this.usersRepository.getIndex(userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    if (teamId) {
      const teamIndex: number = await this.teamsRepository.getIndex(teamId);
      if (teamIndex === -1) {
        return res.status(404).json({ error: 'Team not found' });
      }
    }
    next();
  }
}



export default WorkPeriodsMiddleware;
