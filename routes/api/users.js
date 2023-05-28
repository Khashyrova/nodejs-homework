const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logaut,
  subscription,
} = require("../../controllers/userController");
const { validateBody, authenticate } = require("../../middlewares");
const {
  userRegisterSchema,
  userLoginSchema,
  subscriptionSchema,
} = require("../../helpers/registValidate");

router.post("/register", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logaut", authenticate, logaut);

router.patch("/subscription", validateBody(subscriptionSchema), subscription);

module.exports = router;
