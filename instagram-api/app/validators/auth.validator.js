const Joi = require("joi");

signup = Joi.object().keys({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  mobile: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

login = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  signup,
  login,
};
