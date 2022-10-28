import joi from "joi";

const postComment = joi.object({
  postId: joi.number().greater(0).required(),
  text: joi.string().required(),
});

export { postComment };
