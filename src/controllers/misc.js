import { getCategories, getIngredients } from '../services/misc.js';

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
