import express from "express";

import {
  getCommentsDataByPostId_checkIfAUserFollowsWhoCommented,
  postNewComment,
} from "../controllers/comments.controller.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

import * as schemas from "../schemas/comments.schemas.js";

const router = express.Router();

router.get("/comments/data/:postId/:userId", getCommentsDataByPostId_checkIfAUserFollowsWhoCommented);
router.post("/comment", validateToken, validateSchema(schemas.postComment), postNewComment);

export default router;
