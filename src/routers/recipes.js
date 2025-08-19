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

const router = Router();

// routes: post recipe // auth
// 		delete recipe // auth
// 		favourite recipe (patch) // auth
// 		edit recipe (not in docs) // auth
// 		get recipes (all of them)
// 		get recipe (single) // auth
// 		get filtered recipes
// 		filters: search query
// 				 category
// 				 ingredient (single)
// 				 favourited // auth
// 				 user-created // auth

router.get('/', ctrlWrapper(getRecipesController));

router.get('/mine', authenticate, ctrlWrapper(getMyRecipesController));

router.get(
  '/favourites',
  authenticate,
  ctrlWrapper(getFavouriteRecipesController),
);

router.get(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(getRecipeByIdController),
);

router.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipeController),
);

router.patch(
  '/:id/favourite',
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
