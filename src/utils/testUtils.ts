import db from '../db';
import { DBRoutes, DataInput } from '../types/shared';

async function getDb<T> (route: DBRoutes): Promise<T> {
  return await db.getObject<T>(route);
}

async function writeDb (route: DBRoutes, data: DataInput): Promise<void> {
  return await db.push(route, data);
}

export {
  getDb,
  writeDb,
}
