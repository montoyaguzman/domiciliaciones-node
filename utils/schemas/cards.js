const joi = require("@hapi/joi");

const cardsIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createCardSchema = joi.object({
  cardsNumber: joi
    .string()
    .min(16)
    .max(16)
    .required(),

  expirationDate: joi.string().required(),

  ccv: joi
    .number()
    .max(1000)
    .required()
});

module.exports = {
  cardsIdSchema,
  createCardSchema
};
