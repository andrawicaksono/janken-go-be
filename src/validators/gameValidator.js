const Joi = require("joi");

const saveGameResultSchema = Joi.object({
  id: Joi.number().required(),
  rounds_played: Joi.number().required(),
  player1_wins: Joi.number().required(),
  player2_wins: Joi.number().required(),
  player1_choices: Joi.array().required(),
  player2_choices: Joi.array().required(),
  rounds_winner_id: Joi.array().required(),
});

module.exports = {
  saveGameResultSchema,
};
