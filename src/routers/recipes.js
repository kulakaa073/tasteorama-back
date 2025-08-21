import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

import { createRecipeSchema } from '../validation/recipe.js';

import {
  getRecipesController,
  getMyRecipesController,
  getFavouriteRecipesController,
  getRecipeByIdController,
  createRecipeController,
  deleteRecipeController,
  toggleFavouriteRecipeController,
  //updateRecipeController,
} from '../controllers/recipes.js';

import { parseFormDataArrays } from '../middlewares/parseFormDataArray.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));

router.get('/mine', authenticate, ctrlWrapper(getMyRecipesController));

router.get(
  '/favourites',
  authenticate,
  ctrlWrapper(getFavouriteRecipesController),
);

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.post(
  '/',
  authenticate,
  upload.single('photo'),
  parseFormDataArrays,
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.delete(
  '/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipeController),
);

router.patch(
  '/:recipeId/favourite',
  authenticate,
  isValidId,
  ctrlWrapper(toggleFavouriteRecipeController),
);

// router.patch(
//   '/:id',
//   authenticate,
//   isValidId,
//   upload.single('photo'),
//   validateBody(updateRecipeSchema),
//   ctrlWrapper(updateRecipeController),
// );

export default router;
