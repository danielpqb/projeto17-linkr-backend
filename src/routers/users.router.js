import express from "express";

import {
  postSignUpUser,
  postSignInUser,
  getUserDataByToken,
  getUsersWithFilter,
  getUserById,
} from "../controllers/users.controller.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

import * as schemas from "../schemas/users.schemas.js";

const router = express.Router();

router.post("/signup", validateSchema(schemas.postSignUpUser), postSignUpUser);

router.post("/signin", validateSchema(schemas.postSignInUser), postSignInUser);

router.get("/users/me", validateToken, getUserDataByToken);

router.get("/searchUsers", validateToken, validateSchema(schemas.searchUser), getUsersWithFilter);

router.get("/user/:id", validateToken, getUserById )

export default router;
