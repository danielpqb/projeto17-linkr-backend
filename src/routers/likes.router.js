import { Router } from "express";

import { fetchLikes, fetchWhoLiked, likePost, unlikePost } from "../controllers/likes.controller.js";

const likesRouter = Router();

likesRouter.get("/likes/:postId", fetchLikes);
likesRouter.get("/likes/who/:postId/:userId", fetchWhoLiked);
likesRouter.post("/likes/:postId/:userId", likePost);
likesRouter.delete("/likes/:postId/:userId", unlikePost);

export default likesRouter;
