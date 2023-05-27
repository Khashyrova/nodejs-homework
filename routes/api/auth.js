const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logaut,
} = require("../../controllers/authController");
const { validateBody, authenticate } = require("../../middlewares");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../../helpers/registValidate");

router.post("/register", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logaut", authenticate, logaut);

module.exports = router;
