import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/users.controller';
import { checkIfUserExists, validateEmail } from '../middleware/users';

const usersRouter: Router = Router();

// Validation
usersRouter.use('/:id', checkIfUserExists);
usersRouter.use('/', validateEmail);

// Routes
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id', updateUser);

export default usersRouter;
