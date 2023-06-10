const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controllers/userController");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  userRegisterSchema,
  userLoginSchema,
  subscriptionSchema,
  emailSchema,
} = require("../../helpers/registValidate");

router.post("/register", validateBody(userRegisterSchema), register);

router.get("/verify/:verificationToken", verify);

router.post("/verify", validateBody(emailSchema), resendVerifyEmail);

router.post("/login", validateBody(userLoginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/subscription", validateBody(subscriptionSchema), subscription);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
