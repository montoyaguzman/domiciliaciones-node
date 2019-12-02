const joi = require("@hapi/joi");

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(100)
    .required(),

  lastName: joi
    .string()
    .min(1)
    .max(100),

  cellphone: joi
    .string()
    .min(10)
    .max(10),

  accountNumber: joi.number().max(50),

  password: joi.string().required(),

  cards: joi.array(),

  payments: joi.array(),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  })
});

module.exports = {
  userIdSchema,
  createUserSchema
};
