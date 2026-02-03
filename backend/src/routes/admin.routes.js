import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";
import Enquiry from "../models/Enquiry.js";
import Category from "../models/Category.js";
import redisClient from "../utils/redis.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const CACHE_KEY = "admin:stats";

    // 1️⃣ Check Redis first
    const cachedStats = await redisClient.get(CACHE_KEY);
    if (cachedStats) {
      return res.json(JSON.parse(cachedStats));
    }

    // 2️⃣ Fetch from DB
    const [
      totalProperties,
      siteVisits,
      enquiries,
      categories,
    ] = await Promise.all([
      Property.countDocuments(),
      Booking.countDocuments(),
      Enquiry.countDocuments(),
      Category.countDocuments(),
    ]);

    const stats = {
      totalProperties,
      enquiries,
      siteVisits,
      categories,
    };

    // 3️⃣ Save to Redis (cache for 60 seconds)
    await redisClient.setEx(
      CACHE_KEY,
      60, // seconds
      JSON.stringify(stats)
    );

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

export default router;
