import express, { Express } from 'express';
import usersRouter from './routes/users.router';

const app: Express = express();

app.use(express.json()); // parse body to json
app.use('/users', usersRouter);

export default app;
