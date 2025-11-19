const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const postLeadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().min(18).max(100).required(),
  job: Joi.string(),
  marital: Joi.string(),
  education: Joi.string(),
  defaultCredit: Joi.string(),
  housing: Joi.string(),
  loan: Joi.string(),
  balance: Joi.number(),
  contact: Joi.string(),
  month: Joi.string(),
  dayOfWeek: Joi.string(),
  duration: Joi.number().integer(),
  campaign: Joi.number().integer(),
  pdays: Joi.number().integer(),
  previous: Joi.number().integer(),
  poutcome: Joi.string(),
  empVarRate: Joi.number(),
  consPriceIdx: Joi.number(),
  consConfIdx: Joi.number(),
  euribor3m: Joi.number(),
  nrEmployed: Joi.number(),
  probabilityScore: Joi.number().min(0).max(100),
  predictionResult: Joi.string(),
  category: Joi.string(),
  status: Joi.string(),
});

const postValidatePayload = (payload) => {
  const { e } = postLeadSchema.validate(payload);
  if (e) {
    throw new InvariantError(e.message);
  }
};

module.exports = { postValidatePayload };
