import joi from "joi";

export const createHashtag = joi.object({
  title: joi.string().required(),
});
