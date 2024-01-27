import { handleSaveError, handleUpdateReturnData } from "./hooks.js";
import Joi from "joi";
import { Schema, model } from "mongoose";

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: emailRegexp,
      },
      subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter",
      },
      avatarURL: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        default: null,
      },
    },
    { versionKey: false, timestamps: true }
  );

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", handleUpdateReturnData);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionList),
  token: Joi.string(),
});

export const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

export const avatarUploadSchema = Joi.object({
  fieldname: Joi.string().valid("avatar").required(),
  originalname: Joi.string()
    .regex(/\.(jpg|jpeg|png)$/i)
    .required()
    .messages({
      "any.required": "file type image/jpg, image/jpeg, image/png",
    }),
  size: Joi.number()
    .max(6 * 1024 * 1024)
    .required(),
  mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg").required().messages({
    "any.required": "file type image/jpg, image/jpeg, image/png",
  }),
})
  .label("avatar")
  .unknown(true)
  .required();

const User = model("user", userSchema);

export default User;
