import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), authControllers.register);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authControllers.login
);

authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authControllers.subscription
);

export default authRouter;
