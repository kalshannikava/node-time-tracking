import express, { Express } from 'express';
import DataBase from './db';
import UserService from './services/users.service';
import usersRouter from './routes/users.router';
import teamsRouter from './routes/teams.router';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';
import TeamsController from './controllers/teams.controller';
import TeamsMiddleware from './middleware/teams.middleware';
import TeamsService from './services/teams.service';

const app: Express = express();

const db: DataBase = DataBase.getInstance();

const userService: UserService = new UserService(db);
const usersMiddleware: UsersMiddleware = new UsersMiddleware(db);
const usersController: UsersController = new UsersController(userService);

const teamsService: TeamsService = new TeamsService(db);
const teamsMiddleware: TeamsMiddleware = new TeamsMiddleware(db);
const teamsController: TeamsController = new TeamsController(teamsService);

app.use(express.json()); // parse body to json
app.use('/teams', teamsRouter(teamsController, teamsMiddleware));
app.use('/users', usersRouter(usersController, usersMiddleware));

export default app;
