import Joi from 'joi';

export const ingredientSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.string().required(),
});
