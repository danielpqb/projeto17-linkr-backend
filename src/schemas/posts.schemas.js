import joi from "joi";
import { regexPatterns } from "../constants/regexPatterns";

export const createPost = joi.object({
  userId: joi.number().greater(0).required(),
  link: joi.string().pattern(regexPatterns.url).required(),
  text: joi.string(),
});

export const createPostsHashtags = joi.object({
  postId: joi.number().greater(0).required(),
  hashtagId: joi.number().greater(0).required(),
});

export const updatePost = joi.object({
  text: joi.string().min(0),
});
