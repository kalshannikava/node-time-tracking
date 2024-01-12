import express, { Express } from 'express';
import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';

const app: Express = express();

app.use(express.json()); // parse body to json
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);

export default app;
