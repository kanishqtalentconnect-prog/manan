import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";

import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("media", 10),
  createProperty
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("media", 10),
  updateProperty
);

router.delete("/:id", protect, adminOnly, deleteProperty);


router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
export default router;
