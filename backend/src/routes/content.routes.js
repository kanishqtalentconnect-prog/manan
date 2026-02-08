import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import {
  upsertContent,
  getContentBySection,
} from "../controllers/content.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("media", 5), // reuse same upload
  upsertContent
);

router.get("/:section", getContentBySection);

export default router;
