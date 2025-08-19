// do it for category and ingredient like this or?
const parseRecipeCategory = (category) => {
  if (typeof category !== 'string') return;
  const validCategories = ['work', 'home', 'personal']; // fill in later
  return validCategories.includes(category.trim())
    ? category.trim()
    : undefined;
};

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
  if (ingredient) {
    const ingredients = Array.isArray(ingredient) ? ingredient : [ingredient];
    filter.ingredients = ingredients.filter(
      (ing) => typeof ing === 'string' && ing.trim() !== '',
    );
  }

  return filter;
};
