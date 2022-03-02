const Joi = require("joi");

require("dotenv").config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string(),
  PORT: Joi.string().default(4040),
  JWT_SECRET: Joi.string().required().describe("jwt secret required"),
  MONGO_HOST: Joi.string().required().describe("mongoo url"),
  MONGO_PORT: Joi.number().default(27017),
})
  .unknown()
  .required();
let config;
try {
  const { value: envVars } = envVarsSchema.validate(process.env);
  config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    masterSecret: envVars.MASTER_SECRET,
    mongo: { host: envVars.MONGO_HOST, port: envVars.MONGO_PORT },
    NAMESPACE: {
      LOGIN: "login",
      AUTH: "auth",
      ADMIN: "admin",
      VIEWER: "viewer",
      USER: "user",
      QUESTION: "question",
      DISCONNECT: "disconnect",
    },
    ROOMS: { ADMIN: "admin room", VIEWER: "viewer room", USER: "user room" },
    RECEIVE: {
      LOGIN: { AUTH: 1000 },
    },
    RETURN: {
      AUTH: { LOGIN: 1000, USER_GO_ONLINE: 1001, DISCONNECT: 1002 },
      QUEST: { RAISE: 2000, CHOOSE_ANSWER: 2001, FINISHED_ROUTE: 2002 },
    },
  };
} catch (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
module.exports = config;
