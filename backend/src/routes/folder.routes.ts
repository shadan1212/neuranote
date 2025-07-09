import express from "express";
import {
  createFolder,
  deleteFolder,
  getFolders,
  updateFolder,
} from "../controllers/folder.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { folderSchema } from "../schemas/folder.schema";

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getFolders).post(validate(folderSchema), createFolder);

router
  .route("/:id")
  .put(validate(folderSchema), updateFolder)
  .delete(deleteFolder);

export default router;
