const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
});

const validatePayload = (payload) => {
  const { error } = userSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

module.exports = { validatePayload };
