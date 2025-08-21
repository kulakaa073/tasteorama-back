import { CategoriesCollection } from '../db/models/categories.js';
import { IngredientsCollection } from '../db/models/ingredients.js';

export const getCategories = async () => {
  const categories = await CategoriesCollection.find();
  return categories;
};

export const getIngredients = async () => {
  const ingredients = await IngredientsCollection.find();
  return ingredients;
};

export const createCategories = async (categories) => {
  const createdCategories = await CategoriesCollection.insertMany(categories);
  return createdCategories;
};

export const createIngredients = async (ingredients) => {
  const createdIngredients = await IngredientsCollection.insertMany(
    ingredients,
  );
  return createdIngredients;
};
