import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import {
  createPost,
  getPosts,
  createPostsHashtags,
} from "../controllers/posts.controller.js";

import * as schemas from "../schemas/posts.schemas.js";

const router = Router();

router.post(
  "/create-post",
  validateToken,
  validateSchema(schemas.createPost),
  createPost
);
router.get("/posts", validateToken, getPosts);
router.post(
  "/create-posts-hashtags",
  validateToken,
  validateSchema(schemas.createPostsHashtags),
  createPostsHashtags
);

export default router;
