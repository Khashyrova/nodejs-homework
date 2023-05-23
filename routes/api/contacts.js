const express = require("express");
const {
  getContacts,
  getContactsById,
  addContacts,
  validateEmptyBody,
  updateContactsById,
  updateFavorite,
  deletContactsById,
} = require("../../controllers/contactControllers");

const {
  contactSchema,
  contactUpdateFavoriteSchema,
} = require("../../helpers/ContactValidate");
const { isValidId, validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", isValidId, getContactsById);

router.post("/", validateBody(contactSchema), addContacts);

router.put(
  "/:contactId",
  isValidId,
  validateEmptyBody,
  validateBody(contactSchema),
  updateContactsById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  updateFavorite
);
router.delete("/:contactId", isValidId, deletContactsById);

module.exports = router;
