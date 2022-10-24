import joi from "joi";

export const createPost = joi.object({
  userId: joi.number().greater(0).required(),
  link: joi
    .string()
    .pattern(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    )
    .required(),
  text: joi.string(),
});

export const createPostsHashtags = joi.object({
  postId: joi.number().greater(0).required(),
  hashtagId: joi.number().greater(0).required(),
});

export const updatePost = joi.object({
  text: joi.string().min(0)
})