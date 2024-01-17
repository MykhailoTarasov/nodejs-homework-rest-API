import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:contactId', contactsControllers.getById);

contactsRouter.post('/', isEmptyBody, contactsControllers.addContact);

contactsRouter.delete('/:contactId', contactsControllers.deleteContact);

contactsRouter.put('/:contactId', isEmptyBody, contactsControllers.updateContact)

export default contactsRouter;
