import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { createHashtag, getHashtags, getTrendingHashtags } from "../controllers/hashtags.controller.js";

import * as schemas from "../schemas/hashtags.schemas.js";

const router = Router();

router.post("/create-hashtag", validateToken, validateSchema(schemas.createHashtag), createHashtag);

router.get("/hashtags", validateToken, getHashtags);

router.get("/trending", validateToken, getTrendingHashtags);

export default router;
