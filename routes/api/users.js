const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logout,
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

router.post("/logout", authenticate, logout);

router.patch("/subscription", validateBody(subscriptionSchema), subscription);

module.exports = router;
