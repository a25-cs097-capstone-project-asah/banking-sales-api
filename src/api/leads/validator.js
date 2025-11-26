const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const putLeadStatusByIdSchema = Joi.object({
  status: Joi.string().required(),
});

const putLeadStatusValidator = (payload) => {
  const { error } = putLeadStatusByIdSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

module.exports = putLeadStatusValidator;
