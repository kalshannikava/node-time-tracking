import { Request, Response } from "express";

import db from "../db";
import { User } from "../types/user";

async function getUsers (_req: Request, res: Response) {
  const data: User[] = await db.getObject<User[]>('/users');
  return res.status(200).json(data);
}

export {
  getUsers,
}