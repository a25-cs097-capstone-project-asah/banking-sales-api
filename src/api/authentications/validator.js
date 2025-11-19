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
  const { e } = postAuthenticationSchema.validate(payload);
  if (e) {
    throw new InvariantError(e.message);
  }
};

const putValidatePayload = (payload) => {
  const { e } = putAuthenticationSchema.validate(payload);
  if (e) {
    throw new InvariantError(e.message);
  }
};

const deleteValidatePayload = (payload) => {
  const { e } = deleteAuthenticationSchema.validate(payload);
  if (e) {
    throw new InvariantError(e.message);
  }
};

module.exports = {
  postValidatePayload,
  putValidatePayload,
  deleteValidatePayload,
};
