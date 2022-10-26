import { Router } from "express";

import { validateToken } from "../middlewares/validateToken.middleware.js";
import { createFollow, deleteFollow } from "../controllers/follows.controller.js";

const router = Router();

router.post("/follow/:id", validateToken, createFollow);
router.delete("/follow/:id", validateToken, deleteFollow);

export default router;