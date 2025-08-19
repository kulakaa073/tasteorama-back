import { CategoriesCollection } from '../db/models/categories';
import { IngredientsCollection } from '../db/models/ingredients';

export const getCategories = async () => {
  const categories = await CategoriesCollection.find().select('-__v');
  return categories.map((category) => category.name);
};

export const getIngredients = async () => {
  const ingredients = await IngredientsCollection.find().select('-__v');
  return ingredients.map((ingredient) => ingredient.name);
};
