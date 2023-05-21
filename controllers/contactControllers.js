const contactsService = require("../models/contacts");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");

const getContacts = async (_, res, next) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const addContacts = async (req, res, next) => {
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

const updateContactsById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing fields");
  }
  const id = req.params.contactId;
  const contact = await contactsService.updateContact(id, req.body);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json(contact);
};

const deletContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsService.removeContact(id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getContactsById: ctrlWrapper(getContactsById),
  getContacts: ctrlWrapper(getContacts),
  addContacts: ctrlWrapper(addContacts),
  updateContactsById: ctrlWrapper(updateContactsById),
  deletContactsById: ctrlWrapper(deletContactsById),
};
