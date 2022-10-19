import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { createHashtag } from "../controllers/hashtags.controller.js";

import * as schemas from "../schemas/hashtags.schemas.js";

const router = Router();

router.post(
  "/create-hashtag",
  validateSchema(schemas.createHashtag),
  createHashtag
);

export default router;
