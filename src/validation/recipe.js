import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createRecipeSchema = Joi.object({
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  photo: Joi.string().uri(),
  description: Joi.string().max(500),
  ingredients: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          'string.base': 'Ingredient name must be a string',
          'any.required': 'Ingredient name is required',
        }),
        quantity: Joi.string().required().messages({
          'string.base': 'Ingredient quantity must be a string',
          'any.required': 'Ingredient quantity is required',
        }),
      }),
    )
    .required(),
  instructions: Joi.string().required().messages({
    'string.base': 'Instructions must be a string',
    'any.required': 'Instructions are required',
  }),
  info: Joi.object({
    category: Joi.string().required().messages({
      'string.base': 'Category must be a string',
      'any.required': 'Category is required',
    }),
    cookingTime: Joi.string().required().messages({
      'string.base': 'Cooking time must be a string',
      'any.required': 'Cooking time is required',
    }),
    foodEnergy: Joi.number(),
  }).required(),
});

export const updateRecipeSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  photo: Joi.string().uri(),
  description: Joi.string().max(500),
  ingredients: Joi.array().items(
    Joi.object({
      name: Joi.string().messages({
        'string.base': 'Ingredient name must be a string',
        'any.required': 'Ingredient name is required',
      }),
      quantity: Joi.string().messages({
        'string.base': 'Ingredient quantity must be a string',
        'any.required': 'Ingredient quantity is required',
      }),
    }),
  ),
  instructions: Joi.string().messages({
    'string.base': 'Instructions must be a string',
    'any.required': 'Instructions are required',
  }),
  info: Joi.object({
    category: Joi.string().messages({
      'string.base': 'Category must be a string',
      'any.required': 'Category is required',
    }),
    cookingTime: Joi.string().messages({
      'string.base': 'Cooking time must be a string',
      'any.required': 'Cooking time is required',
    }),
    foodEnergy: Joi.number(),
  }),
});
