import express from "express";
import multer from "multer";
import Review from "../models/Review.js";
import redis from "../utils/redis.js";
import cloudinary from "../config/cloudinary.js";
import {
  createPublicReview,
  createAdminReview,
  getVerifiedReviews,
  verifyReview,
  getAllReviews,
} from "../controllers/review.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= MULTER MEMORY SETUP ================= */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  },
});

/* ================= PUBLIC ROUTES ================= */
router.get("/", getVerifiedReviews);
router.post("/public", upload.single("image"), createPublicReview);

/* ================= ADMIN ROUTES ================= */
router.get("/admin", protect, adminOnly, getAllReviews);
router.patch("/:id/verify", protect, adminOnly, verifyReview);
router.post(
  "/admin",
  protect,
  adminOnly,
  upload.single("image"),
  createAdminReview
);

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review)
      return res.status(404).json({ message: "Review not found" });

    if (review.image) {
      const publicId = review.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      await cloudinary.uploader.destroy(`manan/reviews/${publicId}`);
    }

    await review.deleteOne();
    await redis.del("reviews:verified");

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
