import express, { Express } from 'express';

import type { DataBaseI } from './types/database';

// TODO: pass DB to repository
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function app (db: DataBaseI): Express {

  const application: Express = express();

  application.use(express.json()); // parse body to json

  return application;
}

export default app;
