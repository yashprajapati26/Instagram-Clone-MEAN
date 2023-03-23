const Joi = require("joi");

comment = Joi.object().keys({
	postId: Joi.number().required(),
	cmtBy: Joi.number().required(),
	comment: Joi.string().required(),
	parentId: Joi.number().optional().allow("", null),
});


module.exports = {
    comment:comment,
}