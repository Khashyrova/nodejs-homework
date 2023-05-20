const express = require("express");
const {
  getContacts,
  getContactsById,
  addContacts,
  updateContactsById,
  deletContactsById,
} = require("../../controllers/contactControllers");
const validateBody = require("../../middlewares/ValidateData");
const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../../helpers/ContactValidate");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactsById);

router.post("/", validateBody(contactAddSchema), addContacts);

router.delete("/:contactId", deletContactsById);

router.put(
  "/:contactId",
  validateBody(contactUpdateSchema),
  updateContactsById
);

module.exports = router;
