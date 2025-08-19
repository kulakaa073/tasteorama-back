import { RecipesCollection } from '../db/models/recipe';
import { FavouriteCollection } from '../db/models/favourite.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getRecipes = async ({
  page = 1,
  perPage = 10,
  //sortOrder = SORT_ORDER.ASC,
  //sortBy = '_id',
  filter = {},
  userId = null,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const searchFilter = {};

  if (userId) {
    searchFilter.userId = userId;
  }

  if (filter.name) {
    searchFilter.name = { $regex: filter.name, $options: 'i' };
  }
  if (filter.category) {
    searchFilter.category = filter.category;
  }
  if (filter.ingredients && filter.ingredients.length > 0) {
    searchFilter.ingredients = { $in: filter.ingredients };
  }
  if (filter.favourite) {
    const [{ recipes, recipesCount }] = await FavouriteCollection.aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'recipes',
          localField: 'recipeId',
          foreignField: '_id',
          as: 'recipe',
        },
      },
      { $unwind: '$recipe' },
      { $replaceRoot: { newRoot: '$recipe' } },
      { $match: searchFilter },
      {
        $facet: {
          recipes: [{ $skip: skip }, { $limit: limit }],
          recipesCount: [{ $count: 'count' }],
        },
      },
    ]);

    const paginationData = calculatePaginationData(
      recipesCount[0]?.count || 0,
      perPage,
      page,
    );

    return {
      data: recipes,
      ...paginationData,
    };
  }

  const [recipesCount, recipes] = await Promise.All([
    RecipesCollection.countDocument(searchFilter),
    RecipesCollection.find(searchFilter).skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};
