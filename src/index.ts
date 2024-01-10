import http, { Server } from 'http';
import app from './app';

const PORT: number = Number(process.env.PORT) || 8000;
const server: Server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Listening on ${PORT}...`)
});
