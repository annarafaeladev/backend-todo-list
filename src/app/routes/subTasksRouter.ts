import { Router } from 'express';
import SubTaskController from '../controllers/SubTaskController';
import { authMiddleware } from '../middleware/authMiddleware';

const subTasksRouter = Router();
subTasksRouter.post('/subtasks', SubTaskController.create);
subTasksRouter.get('/subtasks', SubTaskController.findAll);
subTasksRouter.get('/subtasks/:id', SubTaskController.find);
subTasksRouter.put('/subtasks', SubTaskController.update);
subTasksRouter.delete('/subtasks/:id', SubTaskController.delete);

export { subTasksRouter }