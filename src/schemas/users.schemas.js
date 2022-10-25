import joi from "joi";

const postSignUpUser = joi.object({
  name: joi
    .string()
    .pattern(/^[a-zA-Z0-9]*$/i)
    .required(),
  email: joi
    .string()
    .pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .required(),
  password: joi
    .string()
    .pattern(/^(?=.*[0-9])(?=.*[a-z]).{8,32}$/i)
    .required(),
  imageUrl: joi
    .string()
    .pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\/+~#=!$¨&*()]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()]*)$/i)
    .required(),
});

const postSignInUser = joi.object({
  email: joi
    .string()
    .pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .required(),
  password: joi.string().required(),
});

const searchUser = joi.object({
  filter: joi.string().min(0),
});

export { postSignUpUser, postSignInUser, searchUser };
