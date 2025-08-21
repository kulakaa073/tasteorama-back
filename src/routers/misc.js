import { Router } from 'express';
import {
  getCategoriesController,
  getIngredientsController,
  postCategoriesController,
  postIngredientsController,
} from '../controllers/misc.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/categories', ctrlWrapper(getCategoriesController));

router.get('/ingredients', ctrlWrapper(getIngredientsController));

router.post('/categories', ctrlWrapper(postCategoriesController));
router.post('/ingredients', ctrlWrapper(postIngredientsController));

export default router;
