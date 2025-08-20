import { parseRecipeCategory, parseRecipeIngredient } from './parseHelpers.js';

// TODO
// add energy and time filtering
export const parseFilterParams = (query) => {
  const { name, category, ingredient } = query;
  const filter = {};

  if (typeof name === 'string' && name.trim() !== '') {
    filter.name = name.trim();
  }

  const parsedCategory = parseRecipeCategory(category);
  if (parsedCategory) {
    filter.category = parsedCategory;
  }

  const parsedIngredient = parseRecipeIngredient(ingredient);
  if (parsedIngredient) {
    filter.ingredients = parsedIngredient;
  }

  return filter;
};
