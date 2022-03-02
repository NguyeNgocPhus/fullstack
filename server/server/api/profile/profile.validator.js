const Joi = require("joi");

module.exports = {
  createProfile: {
    body: Joi.object({
      company: Joi.allow(null),
      status: Joi.string().required(),
      website: Joi.allow(null),
      skill: Joi.string().required(),
      location: Joi.allow(null),
      bio: Joi.allow(null),
      githubUsername: Joi.allow(null),
      facebook: Joi.allow(null),
      youtube: Joi.allow(null),
      twitter: Joi.allow(null),
      instagram: Joi.allow(null),
    }),
  },
  updateExperience: {
    body: Joi.object({
      title: Joi.string().required(),
      company: Joi.string().required(),
      location: Joi.allow(null),
      from: Joi.allow(null),
      to: Joi.allow(null),
      current: Joi.allow(null),
      description: Joi.allow(null),
    }),
  },
  updateEducation: {
    body: Joi.object({
      school: Joi.string().required(),
      degree: Joi.string().required(),
      fieldofstudy: Joi.allow(null),
      from: Joi.date().required(),
      to: Joi.allow(null),
      current: Joi.allow(null),
      description: Joi.allow(null),
    }),
  },
};
