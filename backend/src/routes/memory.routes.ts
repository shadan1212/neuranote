import express from "express";
import {
  createMemory,
  deleteMemory,
  getMemories,
  updateMemory,
} from "../controllers/memory.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createMemorySchema,
  updateMemorySchema,
} from "../schemas/memory.schema";

const router = express.Router();

// All routes are protected
router.use(protect);

router
  .route("/")
  .get(getMemories)
  .post(validate(createMemorySchema), createMemory);

router
  .route("/:id")
  .put(validate(updateMemorySchema), updateMemory)
  .delete(deleteMemory);

export default router;
