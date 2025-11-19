const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
});

const validatePayload = (payload) => {
  const { e } = userSchema.validate(payload);
  if (e) {
    throw new InvariantError(e.message);
  }
};

module.exports = { validatePayload };
