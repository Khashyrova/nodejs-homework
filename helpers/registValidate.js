const Joi = require("joi");
const emailRegexp = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  name: Joi.string(),
  password: Joi.string().min(8).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});
const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
module.exports = {
  userRegisterSchema,
  userLoginSchema,
  subscriptionSchema,
  emailSchema,
};
