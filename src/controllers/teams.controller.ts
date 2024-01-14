import { Request, Response } from 'express';
import { CreateTeamRequest, DeleteTeamRequest, GetTeamRequest, Team, UpdateTeamRequest } from '../types/team';
import db from '../db';

async function getTeams (_req: Request, res: Response) {
  const data: Team[] = await db.getObject<Team[]>('/teams');
  return res.status(200).json(data);
}

async function getTeam (req: GetTeamRequest, res: Response) {
  const data: Team = await db.getObject<Team>(`/teams[${req.index}]`);
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
  const { name, logo } = req.body;
  const team: Team = await db.getObject<Team>(`/teams[${req.index}]`);
  const updatedTeam: Team = {
    ...team,
    ...name && {name},
    ...logo && {logo},
  };
  await db.push(`/teams[${req.index}]`, updatedTeam, true);
  return res.status(200).json(updatedTeam);
}

async function deleteTeam (req: DeleteTeamRequest, res: Response) {
  const deleted: Team = await db.getObject<Team>(`/teams[${req.index}]`);
  await db.delete(`/teams[${req.index}]`);
  return res.status(200).json(deleted);
}

export {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
}
