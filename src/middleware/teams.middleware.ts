import { Response, NextFunction } from 'express';

import type { Team } from '../types/team';
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
    const index: number = await this.teamsRepository.getIndex(id);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    const team: Team = await this.teamsRepository.get(index);
    req.entity = team;
    req.index = index;
    next();
  }
}

export default TeamsMiddleware;
