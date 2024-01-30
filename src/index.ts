import http, { Server } from 'http';
import { join } from 'path';

import app from './app';
import DataBase from './db';

const filename: string = join(__dirname, 'db', 'db.json');

const db: DataBase = new DataBase(filename);

const PORT: number = Number(process.env.PORT) || 8000;
const server: Server = http.createServer(app(db));

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});
