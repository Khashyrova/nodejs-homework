const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
} = require("../../controllers/userController");
const { validateBody, authenticate, upload } = require("../../middlewares");
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

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
