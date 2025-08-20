import { Schema, model } from 'mongoose';
import { favBinCleanup } from '../../middlewares/favBinCleanup.js';

const favouriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: 'recipes', required: true },
    delRecipeId: { type: Schema.Types.ObjectId, ref: 'favRecycleBin' },
  },
  { timestamps: true },
);

favouriteSchema.index(
  { userId: 1, recipeId: 1 },
  { unique: true, sparse: true },
);

favouriteSchema.index(
  { userId: 1, delRecipeId: 1 },
  { unique: true, sparse: true },
);

favouriteSchema.post('findOneAndDelete', favBinCleanup);

export const FavouriteCollection = model('favourites', favouriteSchema);
