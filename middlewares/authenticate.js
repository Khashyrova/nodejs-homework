const HttpError = require("../helpers/HttpError");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Unathenticate"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Unathenticate"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Unathenticate"));
  }
};

module.exports = authenticate;
