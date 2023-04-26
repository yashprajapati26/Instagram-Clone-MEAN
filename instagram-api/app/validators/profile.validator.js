const Joi = require("joi");

profile = Joi.object().keys({
  userId: Joi.string().required(),
  profile_img: Joi.string().optional().allow("", null),
  bio: Joi.string().optional().allow("", null),
  dob: Joi.date().optional().allow("", null),
  gender: Joi.string().optional().allow("", null),
  city: Joi.string().optional().allow("", null),
  country: Joi.string().optional().allow("", null),
  no_of_followers: Joi.number().optional().allow("", null),
  no_of_following: Joi.number().optional().allow("", null),
});

module.exports = {
  profile,
};
