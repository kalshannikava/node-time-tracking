import { Router } from 'express';
import { createUser, deleteUser, getUsers } from '../controllers/users.controller';

const usersRouter: Router = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;
