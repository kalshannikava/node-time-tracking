import ExpressSession from 'express-session';
import crypto from 'crypto';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';

import { Session } from './entities/Session.entity';

const createSession = (appDataSource: DataSource) => {
  const sessionRepository = appDataSource.getRepository(Session);
  return ExpressSession({
    resave: false,
    saveUninitialized: true,
    store: new TypeormStore({
      cleanupLimit: 2, // for every new session, remove this many expired ones
      ttl: 86400, // ttl in seconds
    }).connect(sessionRepository),
    secret: crypto.randomBytes(32).toString('hex'),
  });
}

export default createSession;
