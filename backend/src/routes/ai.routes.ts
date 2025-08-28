import express from "express";
import { queryAI } from "../controllers/ai.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/query", protect, queryAI);

export default router;
