import { Response, NextFunction } from 'express';

import type { CreateWorkPeriodRequest, UpdateWorkPeriodRequest } from '../types/workPeriod';
import type { RequestWithID } from '../types/shared';
import type WorkPeriodsRepository from '../repositories/workPeriods.repository';
import type UsersRepository from '../repositories/users.repository';
import type TeamsRepository from '../repositories/teams.repository';

type WorkPeriodsMiddlewareContext = {
  workPeriodsRepository: WorkPeriodsRepository,
  usersRepository: UsersRepository,
  teamsRepository: TeamsRepository,
}

class WorkPeriodsMiddleware {
  private workPeriodsRepository: WorkPeriodsRepository;
  private usersRepository: UsersRepository;
  private teamsRepository: TeamsRepository;

  constructor ({ workPeriodsRepository, usersRepository, teamsRepository }: WorkPeriodsMiddlewareContext) {
    this.workPeriodsRepository = workPeriodsRepository;
    this.usersRepository = usersRepository;
    this.teamsRepository = teamsRepository;
  }

  public async checkIfWorkPeriodExists (req: RequestWithID, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const workPeriod = await this.workPeriodsRepository.get(id);
    if (!workPeriod) {
      return res.status(404).json({ error: 'Work period not found' });
    }
    req.entity = workPeriod;
    next();
  }

  public async checkIfTeamOrUserExist (req: CreateWorkPeriodRequest | UpdateWorkPeriodRequest, res: Response, next: NextFunction) {
    const teamId = Number(req.body.teamId);
    const userId = Number(req.body.userId);

    if (Number.isNaN(userId)) {
      return res.status(404).json({ error: 'Invalid user input: expected number' });
    }

    if (Number.isNaN(teamId)) {
      return res.status(404).json({ error: 'Invalid team input: expected number' });
    }

    const user = await this.usersRepository.get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const team = await this.teamsRepository.get(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    } 
    next();
  }
}

export default WorkPeriodsMiddleware;
