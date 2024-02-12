import { Response, NextFunction } from 'express';

import type { Team } from '../entity/Team';
import type { RequestWithID } from '../types/shared';
import TeamsRepository from '../repositories/teams.repository';

type TeamsMiddlewareContext = {
  teamsRepository: TeamsRepository,
}

class TeamsMiddleware {
  private teamsRepository: TeamsRepository;

  constructor ({ teamsRepository }: TeamsMiddlewareContext) {
    this.teamsRepository = teamsRepository;
  }

  public async checkIfTeamExists (req: RequestWithID, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id);
    const team: Team = await this.teamsRepository.get(id);
    if (!team) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.entity = team;
    next();
  }
}

export default TeamsMiddleware;
