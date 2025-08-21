import {
  getCategories,
  getIngredients,
  createCategories,
  createIngredients,
} from '../services/misc.js';

export const getCategoriesController = async (req, res) => {
  const categories = await getCategories();
  res.json({
    status: 200,
    message: 'Categories retrieved successfully',
    data: categories,
  });
};

export const getIngredientsController = async (req, res) => {
  const ingredients = await getIngredients();
  res.json({
    status: 200,
    message: 'Ingredients retrieved successfully',
    data: ingredients,
  });
};

export const postCategoriesController = async (req, res) => {
  const categories = await createCategories(...req.body);
  res.json({
    status: 201,
    message: 'Categories created successfully',
    data: categories,
  });
};

export const postIngredientsController = async (req, res) => {
  const ingredients = await createIngredients(...req.body);
  res.json({
    status: 201,
    message: 'Ingredients created successfully',
    data: ingredients,
  });
};
