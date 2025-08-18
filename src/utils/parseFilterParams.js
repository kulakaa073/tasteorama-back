import { parseNumber, parseBoolean } from './parseHelpers';

// do it category and ingredient like this or?
const parseRecipeCategory = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

// TODO
export const parseFilterParams = (query) => {
  const { name, category, ingredient } = query;
  const filter = {};

  if (typeof name === 'string' && name.trim() !== '') {
    filter.name = name.trim();
  }
  if (typeof category === 'string' && category.trim() !== '') {
    filter.category = category.trim();
  }
  if (typeof ingredient === 'string' && ingredient.trim() !== '') {
    filter.ingredient = ingredient.trim();
  }

  return filter;
};
