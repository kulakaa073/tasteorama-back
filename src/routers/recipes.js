import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

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

router.get('/', ctrlWrapper(getRecipesContoroller));

router.get(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(getRecipeByIdContoroller),
);

router.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createRecipeSchemaContoroller),
  ctrlWrapper(createRecipeContoroller),
);

router.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipeContoroller),
);

router.patch(
  '/:id/favourite',
  authenticate,
  isValidId,
  ctrlWrapper(toggleFavouriteRecipeContoroller),
);

router.patch(
  '/:id',
  authenticate,
  isValidId,
  upload.single('photo'),
  validateBody(editRecipeSchema),
  ctrlWrapper(editRecipeContoroller),
);

export default router;
