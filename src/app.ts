import express, { Express } from 'express';
import DataBase from './db';
import UserService from './services/users.service';
import usersRouter from './routes/users.router';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';

const app: Express = express();

const db: DataBase = DataBase.getInstance();

const userService: UserService = new UserService(db);
const usersMiddleware: UsersMiddleware = new UsersMiddleware(db);
const usersController: UsersController = new UsersController(userService);

app.use(express.json()); // parse body to json
app.use('/users', usersRouter(usersController, usersMiddleware));

export default app;
