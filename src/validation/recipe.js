import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createRecipeSchema = Joi.object({
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
  name: Joi.string().max(64).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  description: Joi.string().max(200).required().messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description should have at most {#limit} characters',
  }),
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
    .min(2)
    .max(16)
    .required()
    .messages({
      'array.base': 'Ingredients must be an array',
      'array.min': 'At least two ingredients are required',
    }),
  instructions: Joi.string().max(1200).required().messages({
    'string.base': 'Instructions must be a string',
    'any.required': 'Instructions are required',
    'string.max': 'Instructions should have at most {#limit} characters',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'any.required': 'Category is required',
  }),
  cookingTime: Joi.string().min(1).max(360).required().messages({
    'string.base': 'Cooking time must be a string',
    'any.required': 'Cooking time is required',
    'string.min': 'Cooking time should have at least {#limit} characters',
    'string.max': 'Cooking time should have at most {#limit} characters',
  }),
  foodEnergy: Joi.number().min(1).max(10000).messages({
    'number.base': 'Food energy must be a number',
    'number.min': 'Food energy must be at least {#limit}',
    'number.max': 'Food energy must be at most {#limit}',
  }),
});

// export const updateRecipeSchema = Joi.object({
//   name: Joi.string().min(3).max(100).messages({
//     'string.base': 'Name must be a string',
//     'string.min': 'Name should have at least {#limit} characters',
//     'string.max': 'Name should have at most {#limit} characters',
//     'any.required': 'Name is required',
//   }),
//   photo: Joi.string().uri(),
//   description: Joi.string().max(500),
//   ingredients: Joi.array().items(
//     Joi.object({
//       name: Joi.string().messages({
//         'string.base': 'Ingredient name must be a string',
//         'any.required': 'Ingredient name is required',
//       }),
//       quantity: Joi.string().messages({
//         'string.base': 'Ingredient quantity must be a string',
//         'any.required': 'Ingredient quantity is required',
//       }),
//     }),
//   ),
//   instructions: Joi.string().messages({
//     'string.base': 'Instructions must be a string',
//     'any.required': 'Instructions are required',
//   }),
//   info: Joi.object({
//     category: Joi.string().messages({
//       'string.base': 'Category must be a string',
//       'any.required': 'Category is required',
//     }),
//     cookingTime: Joi.string().messages({
//       'string.base': 'Cooking time must be a string',
//       'any.required': 'Cooking time is required',
//     }),
//     foodEnergy: Joi.number(),
//   }),
// });
