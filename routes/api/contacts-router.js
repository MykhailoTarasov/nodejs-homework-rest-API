import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import { contactAddSchema, contactUpdateFavoriteSchema, contactUpdateSchema } from "../../models/Contact.js";


const contactsRouter = express.Router()

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:contactId', isValidId, contactsControllers.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactsControllers.addContact);

contactsRouter.delete('/:contactId', isValidId, contactsControllers.deleteContact);

contactsRouter.put('/:contactId', isEmptyBody, validateBody(contactUpdateSchema), isValidId, contactsControllers.updateContact);

contactsRouter.patch(
    "/:contactId/favorite",
    isValidId,
    isEmptyBody,
    validateBody(contactUpdateFavoriteSchema),
    contactsControllers.updateContact
  );

export default contactsRouter;
