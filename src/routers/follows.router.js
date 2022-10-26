import { Router } from "express";

import { validateToken } from "../middlewares/validateToken.middleware.js";
import { createFollow, deleteFollow } from "../controllers/follows.controller.js";
import { validateIds } from "../middlewares/follows.middleware.js";

const router = Router();

router.post("/follow/:id", validateToken, validateIds, createFollow);
router.delete("/follow/:id", validateToken, validateIds, deleteFollow);

export default router;