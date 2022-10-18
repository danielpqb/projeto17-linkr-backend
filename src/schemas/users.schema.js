import joi from "joi";

const postSignUpUser = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref("password"),
});

const postSignInUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { postSignUpUser, postSignInUser };
