const Joi = require("joi");

const message = (field) => ({
  "any.required": `Missing required ${field} field`,
});

const contactSchema = Joi.object({
  name: Joi.string().required().messages(message("name")),
  email: Joi.string().required().messages(message("email")),
  phone: Joi.string().required().messages(message("phone")),
});
const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = { contactSchema, contactUpdateFavoriteSchema };
