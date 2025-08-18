import { Schema, model } from 'mongoose';

const favouriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: 'recipes', required: true },
  },
  { timestamps: true },
);

favouriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const FavouriteCollection = model('favourites', favouriteSchema);
