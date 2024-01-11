import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/users.controller';

const usersRouter: Router = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id', updateUser);

export default usersRouter;
