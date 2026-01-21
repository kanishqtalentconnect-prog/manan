import express from "express";
import { createEnquiry, getAllEnquiries } from "../controllers/enquiry.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createEnquiry);
router.get("/", protect, adminOnly, getAllEnquiries);

export default router;
