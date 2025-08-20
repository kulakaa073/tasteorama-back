import { CategoriesCollection } from '../db/models/categories.js';
import { IngredientsCollection } from '../db/models/ingredients.js';

export const getCategories = async () => {
  const categories = await CategoriesCollection.find().select('-__v');
  return categories.map((category) => category.name);
};

export const getIngredients = async () => {
  const ingredients = await IngredientsCollection.find().select('-__v');
  return ingredients.map((ingredient) => ingredient.name);
};
