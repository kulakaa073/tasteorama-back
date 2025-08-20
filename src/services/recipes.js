import { RecipesCollection } from '../db/models/recipe.js';
import { FavouriteCollection } from '../db/models/favourite.js';
import { FavRecycleBinCollection } from '../db/models/favRecycleBin.js';
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
    searchFilter.category = { $regex: filter.category, $options: 'i' };
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
      {
        $lookup: {
          from: 'favrecyclebins',
          localField: 'delRecipeId',
          foreignField: '_id',
          as: 'delRecipe',
        },
      },
      { $unwind: { path: '$recipe', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$delRecipe', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [{ recipe: searchFilter }, { delRecipe: searchFilter }],
        },
      },
      {
        $addFields: {
          recipeData: { $ifNull: ['$recipe', '$delRecipe'] },
        },
      },
      { $replaceRoot: { newRoot: '$recipeData' } },
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

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findOne(recipeId);
  return recipe;
};

export const createRecipe = async (recipeData) => {
  const recipe = await RecipesCollection.create(recipeData);
  return recipe;
};

export const deleteRecipe = async (recipeId, userId) => {
  const recipe = await RecipesCollection.findOneAndDelete({
    _id: recipeId,
    userId,
  });

  if (recipe) {
    await FavouriteCollection.deleteMany({ recipeId });
    const deleted = await FavRecycleBinCollection.create({
      name: recipe.name,
      photo: recipe.photo,
      description: recipe.description,
      cookingTime: recipe.cookingTime,
      foodEnergy: recipe.foodEnergy,
      deleted: true,
    });
    await FavouriteCollection.updateMany(
      { recipeId: recipe._id },
      { $set: { recipeId: null, delRecipeId: deleted._id } },
    );
  }

  return recipe;
};

export const toggleFavouriteRecipe = async (recipeId, userId) => {
  // Check if recipe exists to not add shadow recipes to collection
  const recipe = await RecipesCollection.findById(recipeId);
  if (!recipe) {
    return null;
  }

  const existingFavourite = await FavouriteCollection.findOne({
    userId,
    recipeId,
  });

  if (existingFavourite) {
    await FavouriteCollection.deleteOne({ _id: existingFavourite._id });
    return { isFavourite: false };
  } else {
    await FavouriteCollection.create({ userId, recipeId });
    return { isFavourite: true };
  }
};

// export const updateRecipe = async (
//   recipeId,
//   recipeData,
//   userId,
//   options = {},
// ) => {
//   const result = await RecipesCollection.findOneAndUpdate(
//     { _id: recipeId, userId },
//     recipeData,
//     {
//       new: true,
//       runValidators: true, // Ensures that the update adheres to the schema
//       includeResultMetadata: true,
//       ...options,
//     },
//   );

//   if (!result || !result.value) return null;

//   return {
//     recipe: result.value,
//     isNew: Boolean(result?.lastErrorObject?.upserted),
//   };
// };
