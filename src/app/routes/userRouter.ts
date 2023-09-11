import { Router } from 'express';
import UserController from '../controllers/UserController';

const usersRouter = Router();

usersRouter.post('/users', UserController.create);
usersRouter.get('/users/:id', UserController.find);
usersRouter.put('/users/:id', UserController.update);
usersRouter.delete('/users/:id', UserController.delete);

export { usersRouter }