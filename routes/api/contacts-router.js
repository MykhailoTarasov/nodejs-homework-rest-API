import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:contactId', contactsControllers.getById);

contactsRouter.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default contactsRouter;
