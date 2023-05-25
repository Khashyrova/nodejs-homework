const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id format`));
  }
  next();
};
module.exports = isValidId;
