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

const User = model("user", userSchema);

export default User;
