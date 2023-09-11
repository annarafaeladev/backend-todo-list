import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.post('/categories', CategoryController.create);
router.get('/categories', CategoryController.getCategories);
router.put('/categories', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);


export { router as categoriesRouter }