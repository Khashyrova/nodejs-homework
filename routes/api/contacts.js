const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");
const { nanoid } = require("nanoid");
const { newInfoSchema, newContactSchema } = require("../../helpers/Validate");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);
    if (!result) {
      res.status(404).json({ message: "Not found contact with that it." });
    }
    res.status(200).json({
      message: "Success",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const myContact = await getContactById(id);
    if (!myContact) {
      res.status(404).json({ message: "Not found contact with that it." });
    } else {
      await removeContact(id);
      res.json({
        status: "success",
        code: "200",
        message: "contact deleted",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const isValid = newContactSchema.validate({
      id: nanoid(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    if (isValid.error) {
      res.status(400).json({ message: "Missing required field." });
    }
    const newContact = isValid.value;
    await addContact(newContact);
    res.json({
      status: "success",
      code: "200",
      newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const isValid = newInfoSchema.validate({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    const updContact = isValid.value;
    if (!isValid.error) {
      const newContact = await updateContact(id, updContact);
      res.json({
        status: "success",
        code: "200",
        newContact,
      });
    } else {
      res.status(400).json({ message: "Missing all field." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
