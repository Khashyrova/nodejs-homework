const Joi = require("joi");
const HttpError = require("../helpers/HttpError");
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

const validateData = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      const message = "missing fields";
      throw HttpError(400, message);
    } else {
      const { error } = schema.validate(req.body);

      if (error) {
        const message = `missing required ${error.details[0].context.label} field`;
        throw HttpError(400, message);
      }
    }

    next();
  };
  return func;
};

module.exports = {
  newContactSchema,
  newInfoSchema,
  validateData,
};
