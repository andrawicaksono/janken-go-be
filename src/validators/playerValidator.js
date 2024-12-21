const Joi = require("joi");

const updateNicknameSchema = Joi.object({
  nickname: Joi.string().min(3).max(20).required(),
});

module.exports = {
  updateNicknameSchema,
};
