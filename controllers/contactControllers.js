const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
const Contact = require("../models/contacts");

const getContacts = async (_, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById({ _id: id });

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const addContacts = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const updateContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json(contact);
};
const validateEmptyBody = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "Missing fields");
  next();
};
const updateFavorite = async (req, res) => {
  const id = req.params.contactId;
  console.log(id);
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json(contact);
};
const deletContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndDelete(id);

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
  validateEmptyBody: ctrlWrapper(validateEmptyBody),
  updateFavorite: ctrlWrapper(updateFavorite),
};
