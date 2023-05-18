const Joi = require("joi");

const newContactSchema = Joi.object({
  id: Joi.string(),

  name: Joi.string().pattern(new RegExp("^[a-zA-Z]+ [a-zA-Z]+$")).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string()
    .pattern(new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"))
    .required(),
});

const newInfoSchema = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-zA-Z]+ [a-zA-Z]+$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string().pattern(
    new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$")
  ),
}).nand("name", "email", "phone");

module.exports = {
  newContactSchema,
  newInfoSchema,
};
