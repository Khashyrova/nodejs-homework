const Joi = require("joi");

const message = (field) => ({
  "any.required": `Missing required ${field} field`,
});

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages(message("name")),
  email: Joi.string().required().messages(message("email")),
  phone: Joi.string().required().messages(message("phone")),
});
const contactUpdateSchema = Joi.object({
  name: Joi.string().required().messages(message("name")),
  email: Joi.string().required().messages(message("email")),
  phone: Joi.string().required().messages(message("phone")),
});

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
};
