import { Request, Response, Router } from 'express';
import { usersRouter } from './userRouter';
import { categoriesRouter } from './categoriesRouter';
import { tasksRouter } from './tasksRouter';
import { subTasksRouter } from './subTasksRouter';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();

routes.get("/api/status", async (req: Request, res: Response): Promise<Response> => res.status(201).json({ status: "Api is runnning..." }));

routes.use(usersRouter);

routes.use(authMiddleware);

routes.use(categoriesRouter);
routes.use(tasksRouter);
routes.use(subTasksRouter);

export { routes }