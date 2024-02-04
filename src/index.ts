import http, { Server } from 'http';
import { join } from 'path';

import app from './app';

const dbPath: string = join(__dirname, 'db', 'db.json');

const PORT: number = Number(process.env.PORT) || 8000;
const server: Server = http.createServer(app(dbPath));

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});
