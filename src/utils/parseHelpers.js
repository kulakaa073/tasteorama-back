import { IngredientsCollection } from '../db/models/ingredients.js';
import { CategoriesCollection } from '../db/models/categories.js';

export const parseRecipeCategory = async (category) => {
  if (typeof category !== 'string') return;
  const validCategory = await CategoriesCollection.findOne({
    name: category.trim(),
  });
  return validCategory ? validCategory._id : undefined;
};

export const parseRecipeIngredient = async (ingredient) => {
  if (typeof ingredient !== 'string') return;
  const validIngredient = await IngredientsCollection.findOne({
    name: ingredient.trim(),
  });
  return validIngredient ? validIngredient._id : undefined;
};

export const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }

  return parsedNumber;
};

export const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};
