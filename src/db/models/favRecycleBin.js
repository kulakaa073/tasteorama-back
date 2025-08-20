import { Schema, model } from 'mongoose';

const favRecycleBinSchema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String },
    description: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    cookingTime: { type: Number, required: true },
    foodEnergy: { type: Number },
    deleted: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FavRecycleBinCollection = model(
  'favRecycleBin',
  favRecycleBinSchema,
);
