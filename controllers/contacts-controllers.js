import Contact from "../models/Contact.js";

import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/schemas-contact.js";

import { HttpError } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// const getById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const addContact = async (req, res, next) => {
//   try {
//     const { error } = contactAddSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contactsService.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json({ message: "Contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateContact = async (req, res, next) => {
//   try {
//     const { error } = contactUpdateSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { contactId } = req.params;
//     const result = await contactsService.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  getAll,
  // getById,
  // addContact,
  // deleteContact,
  // updateContact,
};
