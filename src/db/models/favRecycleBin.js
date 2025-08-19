import { Schema, model } from 'mongoose';

const favRecycleBinSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String },
  description: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  foodEnergy: { type: Number },
  deletedAt: { type: Date, default: Date.now },
});

export const FavRecycleBinCollection = model(
  'favRecycleBin',
  favRecycleBinSchema,
);
