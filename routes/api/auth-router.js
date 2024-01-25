import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import {
  userSigninSchema,
  userSignupSchema,
  updateSubscriptionSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  authControllers.signin
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
