import express from "express";

import { getCommentsDataByPostId, postComment } from "../controllers/comments.controller.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

import * as schemas from "../schemas/comments.schemas.js";

const router = express.Router();

router.get("/comments/:postId", getCommentsDataByPostId);
router.post("/comment/:postId", validateToken, validateSchema(schemas.postComment), postComment);

export default router;
