const Joi = require("joi");

module.exports = {
  createPost: {
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
  createComment: {
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
};
