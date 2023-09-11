import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const router = Router();

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.find);
router.put('/tasks', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

export { router as tasksRouter }