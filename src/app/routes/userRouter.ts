import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const usersRouter = Router();

usersRouter.post('/api', UserController.status);
usersRouter.post('/users', UserController.create);
usersRouter.post('/login', UserController.login);

usersRouter.use(authMiddleware);

usersRouter.get('/users', UserController.find);
usersRouter.put('/users/:id', UserController.update);
usersRouter.delete('/users/:id', UserController.delete);

export { usersRouter }