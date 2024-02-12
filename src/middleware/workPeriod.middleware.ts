import { Response, NextFunction } from 'express';

import type { CreateWorkPeriodRequest, UpdateWorkPeriodRequest } from '../types/workPeriod';
import type { WorkPeriod } from '../entity/WorkPeriod';
import type { RequestWithID } from '../types/shared';
import type WorkPeriodsRepository from '../repositories/workPeriods.repository';
import type UsersRepository from '../repositories/users.repository';
import type TeamsRepository from '../repositories/teams.repository';
import { User } from '../entity/User';
import { Team } from '../entity/Team';

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
    const workPeriod: WorkPeriod = await this.workPeriodsRepository.get(id);
    if (!workPeriod) {
      return res.status(404).json({ error: 'Work period not found' });
    }
    req.entity = workPeriod;
    next();
  }

  public async checkIfTeamOrUserExist (req: CreateWorkPeriodRequest | UpdateWorkPeriodRequest, res: Response, next: NextFunction) {
    const teamId: number = Number(req.body.teamId);
    const userId: number = Number(req.body.userId);
    const user: User = await this.usersRepository.get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const team: Team = await this.teamsRepository.get(teamId);
    if (team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    next();
  }
}

export default WorkPeriodsMiddleware;
