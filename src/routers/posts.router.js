import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { createPost } from "../controllers/posts.controller.js";

import * as schemas from "../schemas/posts.schemas.js";

const router = Router();

router.post(
  "/create-post",
  validateToken,
  validateSchema(schemas.createPost),
  createPost
);

export default router;
