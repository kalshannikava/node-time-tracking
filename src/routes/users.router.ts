import { Router } from 'express';
import { createUser, getUsers } from '../controllers/users.controller';

const usersRouter: Router = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);

export default usersRouter;
