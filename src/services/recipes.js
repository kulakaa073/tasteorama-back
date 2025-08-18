import { RecipesCollection } from '../db/models/recipe';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllRecipes = async;
({
  page = 1,
  perPage = 10,
  //sortOrder = SORT_ORDER.ASC,
  //sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const searchFilter = { userId };
};
