const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactControllers");

const { newContactSchema, newInfoSchema } = require("../../helpers/Validate");
const { validateData } = require("../../middlewares/ValidateData");
const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", validateData(newContactSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateData(newInfoSchema), updateContact);

module.exports = router;
