import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'test', 'staging')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  NODEMAILER_EMAIL_HOST: Joi.string().required(),
  NODEMAILER_EMAIL_PORT: Joi.string().required(),
  NODEMAILER_EMAIL_USER: Joi.string().required(),
  NODEMAILER_EMAIL_PASSWORD: Joi.string().required(),
});
