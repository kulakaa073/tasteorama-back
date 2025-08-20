import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true },
    photo: { type: String },
    description: { type: String, required: true },
    ingredients: {
      type: [
        {
          ingredientId: {
            type: Schema.Types.ObjectId,
            ref: 'ingredients',
          },
          quantity: { type: String },
        },
      ],
      required: true,
    },
    instructions: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    cookingTime: { type: Number, required: true },
    foodEnergy: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

recipeSchema.index({ userId: 1 });

export const RecipesCollection = model('recipes', recipeSchema);
