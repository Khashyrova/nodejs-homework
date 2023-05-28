const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
const Contact = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", " name email");
  res.json(contacts);
};

const getContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;
  const contact = await Contact.findById({ _id: id, owner });

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const addContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

const updateContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;
  const contact = await Contact.updateOne({ _id: id, owner }, req.body, {
    new: true,
  });

  if (contact.modifiedCount === 0) {
    throw HttpError(404, "Not found");
  }
  const result = await Contact.findById(id);
  res.status(201).json(result);
};
const validateEmptyBody = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "Missing fields");
  next();
};
const updateFavorite = async (req, res) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;
  const contact = await Contact.updateOne({ _id: id, owner }, req.body, {
    new: true,
  });
  if (contact.modifiedCount === 0) {
    throw HttpError(404, "Not found");
  }

  const result = await Contact.findById(id);
  res.status(201).json(result);
};
const deletContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;
  const contact = await Contact.deleteOne({ _id: id, owner });

  if (contact.deletedCount === 0) {
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
