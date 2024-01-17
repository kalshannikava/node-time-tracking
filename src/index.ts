import http, { Server } from 'http';
import app from './app';
import DataBase from './db';

const PORT: number = Number(process.env.PORT) || 8000;
const server: Server = http.createServer(app);

DataBase.getInstance();

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
});
