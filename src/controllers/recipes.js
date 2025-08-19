import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
//import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

import {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
  toggleFavouriteRecipe,
  //updateRecipe,
} from '../services/recipes.js';

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  //const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const recipes = await getRecipes({
    page,
    perPage,
    //sortBy,
    //sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully fetched all recipes!',
    data: recipes,
  });
};

export const getMyRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);
  const recipes = await getRecipes({
    page,
    perPage,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully fetched my recipes!',
    data: recipes,
  });
};

export const getFavouriteRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);
  filter.favourite = true;
  const recipes = await getRecipes({
    page,
    perPage,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully fetched favourite recipes!',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);
  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }
  res.json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};

export const createRecipeController = async (req, res) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const recipe = await createRecipe({
    ...req.body,
    photo: photoUrl,
    userId: req.user._id,
  });

  res.json({
    status: 201,
    message: 'Successfully created recipe!',
    data: recipe,
  });
};

export const deleteRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await deleteRecipe(recipeId, req.user._id);

  if (!recipe) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.status(204).send();
};

export const toggleFavouriteRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const result = await toggleFavouriteRecipe({
    recipeId,
    userId: req.user._id,
  });
  if (!result) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully toggled favourite recipe with id ${recipeId}!`,
    data: result,
  });
};

// export const updateRecipeController = async (req, res, next) => {
//   const { recipeId } = req.params;
//   const photo = req.file;

//   let photoUrl;

//   if (photo) {
//     if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
//       photoUrl = await saveFileToCloudinary(photo);
//     } else {
//       photoUrl = await saveFileToUploadDir(photo);
//     }
//   }

//   const result = await updateRecipe(
//     recipeId,
//     {
//       ...req.body,
//       photo: photoUrl,
//     },
//     req.user._id,
//   );

//   if (!result) {
//     next(createHttpError(404, 'Recipe not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully edited recipe with id ${recipeId}!`,
//     data: result,
//   });
// };
