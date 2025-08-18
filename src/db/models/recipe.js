import { Schema, model } from 'mongoose';

// userId: objectId - reference to users collection
// name: string
// photo: file
// description: string
// learn more link: string - frontend only
// favourite: boolean
// ingredients: array of objects
// ingredients: [{ name: string, quantity: string }]
// instructions: string
// info: object
// info: {category: string, cooking time: string, food energy: number}

const recipeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true },
    photo: { type: String },
    description: { type: String },
    isFavourite: { type: Boolean, default: false },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    instructions: { type: String, required: true },
    info: {
      category: { type: String, required: true },
      cookingTime: { type: String },
      foodEnergy: { type: Number },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipes', recipeSchema);
