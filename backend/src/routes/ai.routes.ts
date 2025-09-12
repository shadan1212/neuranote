import express from "express";
import { queryAI } from "../controllers/ai.controller";
import { protect } from "../middlewares/auth.middleware";
import { checkApiLimit } from "../middlewares/apiLimit.middleware";
import rateLimit from "express-rate-limit";

// Apply the rate limiter to all AI routes
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 9, // Set slightly below your RPM limit of 10
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "The AI is receiving too many requests. Please try again in a minute.",
  keyGenerator: (req) => {
    // Use a constant key for all requests to create a single global limit
    return "global";
  },
});

const router = express.Router();

router.use(aiLimiter);

router.post("/query", protect, checkApiLimit, queryAI);

export default router;
