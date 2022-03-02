const Joi = require("joi");

module.exports = {
  create: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string(),
    },
  },
};
