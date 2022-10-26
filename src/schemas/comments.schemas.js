import joi from "joi";
import { regexPatterns } from "../constants/regexPatterns.js";

const postComment = joi.object({
  userId: joi.number().greater(0).required(),
  postId: joi.number().greater(0).required(),
  text: joi.string().required(),
});

export { postComment };
