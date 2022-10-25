import joi from "joi";
import { regexPatterns } from "../constants/regexPatterns.js";

const postSignUpUser = joi.object({
  name: joi.string().pattern(regexPatterns.name).required(),
  email: joi.string().pattern(regexPatterns.email).required(),
  password: joi.string().pattern(regexPatterns.password).required(),
  imageUrl: joi.string().pattern(regexPatterns.url).required(),
});

const postSignInUser = joi.object({
  email: joi.string().pattern(regexPatterns.email).required(),
  password: joi.string().required(),
});

const searchUser = joi.object({
  filter: joi.string().min(0),
});

export { postSignUpUser, postSignInUser, searchUser };
