import { Router } from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/users.controller';

const usersRouter: Router = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id', updateUser);

export default usersRouter;
