import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";

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

export default authRouter;
