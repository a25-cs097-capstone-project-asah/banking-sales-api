const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const noteSchema = Joi.object({
  body: Joi.string().required(),
});

const noteValidatePayload = (payload) => {
  const { error } = noteSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

module.exports = noteValidatePayload;
