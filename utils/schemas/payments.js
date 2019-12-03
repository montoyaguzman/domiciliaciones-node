const joi = require("@hapi/joi");

const paymentsIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const paymentsCardSchema = joi.object({
  idCard: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  idAgreement: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  alias: joi.string(),
  description: joi.string(),
  reference: joi.string(),
  paymentDate: joi.string().required(),
  status: joi.string().required()
});

module.exports = {
  paymentsIdSchema,
  paymentsCardSchema
};
