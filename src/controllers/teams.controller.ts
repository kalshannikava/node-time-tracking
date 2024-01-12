import { Request, Response } from 'express';
import { CreateTeamRequest, DeleteTeamRequest, GetTeamRequest, Team, UpdateTeamRequest } from '../types/team';
import db from '../db';

async function getTeams (_req: Request, res: Response) {
  const data: Team[] = await db.getObject<Team[]>('/teams');
  return res.status(200).json(data);
}

async function getTeam (req: GetTeamRequest, res: Response) {
  const id: number = Number(req.params.id);
  const index: number = await db.getIndex('/teams', id, 'id');
  if (index === -1) {
    return res.status(404).json({ error: 'Team not found' });
  }
  const data: Team = await db.getObject<Team>(`/teams[${index}]`);
  return res.status(200).json(data);
}

async function createTeam (req: CreateTeamRequest, res: Response) {
  const lastTeam: Team = await db.getObject<Team>('/teams[-1]');
  const team: Team = {
    ...req.body,
    id: lastTeam.id + 1,
  };
  if (!team.name || !team.logo) {
    return res.status(400).json({ error: 'Missing required property' });
  }
  await db.push('/teams[]', team);
  return res.status(201).json(team);
}

async function updateTeam (req: UpdateTeamRequest, res: Response) {
  const id: number = Number(req.params.id);
  const index: number = await db.getIndex('/teams', id, 'id');
  if (index === -1) {
    return res.status(404).json({ error: 'Team not found' });
  }
  const { name, logo } = req.body;
  const team: Team = await db.getObject<Team>(`/teams[${index}]`);
  const updatedTeam: Team = {
    ...team,
    ...name && {name},
    ...logo && {logo},
  };
  await db.push(`/teams[${index}]`, updatedTeam, true);
  return res.status(200).json(updatedTeam);
}

async function deleteTeam (req: DeleteTeamRequest, res: Response) {
  const id: number = Number(req.params.id);
  const index: number = await db.getIndex('/teams', id, 'id');
  if (index === -1) {
    return res.status(404).json({ error: 'Team not found' });
  }
  const deleted: Team = await db.getObject<Team>(`/teams[${index}]`);
  await db.delete(`/teams[${index}]`);
  return res.status(200).json(deleted);
}

export {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
}
