import joi from "joi";

const postSignUpUser = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref("password"),
  imageUrl: joi
    .string()
    .pattern(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    )
    .required(),
});

const postSignInUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { postSignUpUser, postSignInUser };
