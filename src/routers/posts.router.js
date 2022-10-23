import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { validateUserPropertyPost } from "../middlewares/validateUserPropertyPost.js";
import {
  createPost,
  getPosts,
  getAllPosts,
  createPostsHashtags,
  getHashtagPosts,
  updateUserPost,
  updatePostsHashtags,
  deletePost,
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
router.get("/all-posts", validateToken, getAllPosts);
router.get("/posts/hashtag/:hashtag", validateToken, getHashtagPosts);
router.post(
  "/create-posts-hashtags",
  validateToken,
  validateSchema(schemas.createPostsHashtags),
  createPostsHashtags
);
router.put(
  "/posts/:id",
  validateToken,
  validateSchema(schemas.updatePost),
  validateUserPropertyPost,
  updateUserPost
);
router.put(
  "/posts/:id/hashtags",
  validateToken,
  validateUserPropertyPost,
  updatePostsHashtags
)

router.delete("/post/delete/:postId", validateToken, deletePost);

export default router;
