import { Router } from 'express';
import {
  getCategoriesController,
  getIngredientsController,
} from '../controllers/misc.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/categories', ctrlWrapper(getCategoriesController));

router.get('/ingredients', ctrlWrapper(getIngredientsController));

export default router;
