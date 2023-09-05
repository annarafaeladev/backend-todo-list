import { Router } from 'express';
import { categoryController } from '../controllers/CategoryController';

const routes = Router();

routes.use('/categories', categoryController);

export { routes }