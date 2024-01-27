import fs from "fs/promises";
import path from "path";

import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const avatarsPath = path.resolve("public", "avatars");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const query = { owner };
  const skip = (page - 1) * limit;

  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }
  const result = await Contact.find(query, "-createdAt -updatedAt", { skip, limit }).populate("owner", [
    "email",
    "subscription",
  ]);
  if (result.length === 0) {
    res.json({ message: "No contacts found" });
  } else {
    res.json({ contacts: result, currentPage: page });
  }
};

const getById = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};


export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};


