import express from "express";

import {
  postSignUpUser,
  postSignInUser,
  getUsersWithFilter
} from "../controllers/users.controller.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";

import * as schemas from "../schemas/users.schemas.js";

const router = express.Router();

router.post(
  "/signup",
  validateSchema(schemas.postSignUpUser),
  postSignUpUser
);

router.post(
  "/signin",
  validateSchema(schemas.postSignInUser),
  postSignInUser
);

router.get(
  "/searchUsers",
  validateSchema(schemas.searchUser),
  getUsersWithFilter
);

export default router;
