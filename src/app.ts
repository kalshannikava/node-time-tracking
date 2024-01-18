import express, { Express } from 'express';
import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import workPeriodsRouter from './routes/workPeriods.router';

const app: Express = express();

app.use(express.json()); // parse body to json
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/workPeriods', workPeriodsRouter)

export default app;
