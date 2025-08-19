// do it for category and ingredient like this or?
// scrap for now, there's could be too many to enum them
// const parseRecipeCategory = (category) => {
//   if (typeof category !== 'string') return;
//   const validCategories = ['work', 'home', 'personal']; // fill in later
//   return validCategories.includes(category.trim())
//     ? category.trim()
//     : undefined;
// };

// TODO
// add energy and time filtering
export const parseFilterParams = (query) => {
  const { name, category, ingredient } = query;
  const filter = {};

  if (typeof name === 'string' && name.trim() !== '') {
    filter.name = name.trim();
  }

  //const parsedCategory = parseRecipeCategory(category);
  if (typeof category === 'string' && name.trim() !== '') {
    filter.category = category.trim();
  }

  if (ingredient) {
    const ingredients = Array.isArray(ingredient) ? ingredient : [ingredient];
    filter.ingredients = ingredients.filter(
      (ing) => typeof ing === 'string' && ing.trim() !== '',
    );
  }

  return filter;
};
