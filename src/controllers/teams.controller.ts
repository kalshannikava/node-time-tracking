import { Request, Response } from 'express';

import TeamsService from '../services/teams.service';
import type { CreateTeamRequest, DeleteTeamRequest, GetTeamRequest, Team, UpdateTeamRequest } from '../types/team';

async function getTeams (_req: Request, res: Response) {
  const data: Team[] = await TeamsService.getTeams();
  return res.status(200).json(data);
}

async function getTeam (req: GetTeamRequest, res: Response) {
  return res.status(200).json(req.entity);
}

async function createTeam (req: CreateTeamRequest, res: Response) {
  try {
    const team: Team = await TeamsService.createTeam(req.body);
    return res.status(201).json(team);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateTeam (req: UpdateTeamRequest, res: Response) {
  const updatedTeam: Team = await TeamsService.updateUser(req.index, req.entity as Team, req.body);
  res.status(200).json(updatedTeam);
}

async function deleteTeam (req: DeleteTeamRequest, res: Response) {
  await TeamsService.deleteTeam(req.index);
  return res.status(200).json(req.entity);
}

export {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
}
