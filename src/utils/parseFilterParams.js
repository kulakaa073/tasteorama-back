import { parseRecipeCategory, parseRecipeIngredient } from './parseHelpers.js';

// TODO
// add energy and time filtering
export const parseFilterParams = async (query) => {
  const { name, category, ingredient } = query;
  const filter = {};

  if (typeof name === 'string' && name.trim() !== '') {
    filter.name = name.trim();
  }

  const parsedCategory = await parseRecipeCategory(category);
  if (parsedCategory) {
    filter.category = parsedCategory;
  }

  const parsedIngredient = await parseRecipeIngredient(ingredient);
  if (parsedIngredient) {
    filter.ingredients = parsedIngredient;
  }

  return filter;
};
