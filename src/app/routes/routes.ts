import { Router } from 'express';
import { usersRouter } from './userRouter';
import { categoriesRouter } from './categoriesRouter';
import { tasksRouter } from './tasksRouter';
import { subTasksRouter } from './subTasksRouter';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();

routes.use(usersRouter);

routes.use(authMiddleware);

routes.use(categoriesRouter);
routes.use(tasksRouter);
routes.use(subTasksRouter);

export { routes }