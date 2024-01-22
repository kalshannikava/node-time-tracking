import express, { Express } from 'express';
import DataBase from './db';
import UserService from './services/users.service';
import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import workPeriodsRouter from './routes/workPeriods.router';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import TeamsController from './controllers/teams.controller';
import TeamsMiddleware from './middleware/teams.middleware';
import TeamsService from './services/teams.service';
import WorkPeriodsController from './controllers/workPeriods.controller';
import WorkPeriodsMiddleware from './middleware/workPeriod.middleware';
import WorkPeriodsService from './services/workPeriods.service';

const app: Express = express();

const db: DataBase = DataBase.getInstance();

const userService: UserService = new UserService(db);
const usersMiddleware: UsersMiddleware = new UsersMiddleware(db);
const usersController: UsersController = new UsersController(userService);

const teamsService: TeamsService = new TeamsService(db);
const teamsMiddleware: TeamsMiddleware = new TeamsMiddleware(db);
const teamsController: TeamsController = new TeamsController(teamsService);

const workPeriodsService: WorkPeriodsService = new WorkPeriodsService(db);
const workPeriodsMiddleware: WorkPeriodsMiddleware = new WorkPeriodsMiddleware(db);
const workPeriodsController: WorkPeriodsController = new WorkPeriodsController(workPeriodsService);

app.use(express.json()); // parse body to json
app.use('/workPeriods', workPeriodsRouter(workPeriodsController, workPeriodsMiddleware));
app.use('/teams', teamsRouter(teamsController, teamsMiddleware));
app.use('/users', usersRouter(usersController, usersMiddleware));

export default app;
