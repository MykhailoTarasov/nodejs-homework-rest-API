import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";
import { validateBody, validateAvatar } from "../../decorators/index.js";
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
  avatarUploadSchema
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
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  validateAvatar(avatarUploadSchema),
  authControllers.updateAvatar
);

export default authRouter;
