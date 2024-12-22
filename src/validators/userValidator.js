const Joi = require("joi");

const updateUserSchema = Joi.object({
  nickname: Joi.string().min(3).max(20),
  avatar_url: Joi.string(),
});

module.exports = {
  updateUserSchema,
};
