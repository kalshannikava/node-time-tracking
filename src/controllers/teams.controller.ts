import { Request, Response } from 'express';

import type TeamsService from '../services/teams.service';
import type { CreateTeamRequest, DeleteTeamRequest, GetTeamRequest, Team, UpdateTeamRequest } from '../types/team';

type Config = {
  teamsService: TeamsService,
}

class TeamsController {
  private teamsService: TeamsService;

  constructor ({ teamsService }: Config) {
    this.teamsService = teamsService;
  }

  public async getTeams (_req: Request, res: Response) {
    const data: Team[] = await this.teamsService.getAll();
    return res.status(200).json(data);
  }

  public async getTeam (req: GetTeamRequest, res: Response) {
    return res.status(200).json(req.entity);
  }

  public async createTeam (req: CreateTeamRequest, res: Response) {
    try {
      const team: Team = await this.teamsService.create(req.body);
      return res.status(201).json(team);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async updateTeam (req: UpdateTeamRequest, res: Response) {
    const updatedTeam: Team = await this.teamsService.update(req.index, req.entity as Team, req.body);
    res.status(200).json(updatedTeam);
  }

  public async deleteTeam (req: DeleteTeamRequest, res: Response) {
    await this.teamsService.delete(req.index);
    return res.status(200).json(req.entity);
  }
}


export default TeamsController;
