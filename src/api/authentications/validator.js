const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const postAuthenticationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const putAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const deleteAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const postValidatePayload = (payload) => {
  const { error } = postAuthenticationSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

const putValidatePayload = (payload) => {
  const { error } = putAuthenticationSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

const deleteValidatePayload = (payload) => {
  const { error } = deleteAuthenticationSchema.validate(payload);
  if (error) {
    throw new InvariantError(error.message);
  }
};

module.exports = {
  postValidatePayload,
  putValidatePayload,
  deleteValidatePayload,
};
