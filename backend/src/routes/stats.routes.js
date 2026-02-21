import express from "express";
import SiteStats from "../models/SiteStats.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import redisClient from "../config/redis.js";

const router = express.Router();

/**
 * @route   PUT /api/stats
 * @desc    Update site statistics (Admin only)
 */
router.put("/", protect, adminOnly, async (req, res) => {
  try {
    const { transactionValue, happyCustomers } = req.body;

    let stats = await SiteStats.findOne();

    if (!stats) {
      stats = await SiteStats.create({
        transactionValue,
        happyCustomers,
      });
    } else {
      stats.transactionValue = transactionValue ?? stats.transactionValue;
      stats.happyCustomers = happyCustomers ?? stats.happyCustomers;
      await stats.save();
    }

    await redisClient.del("site_stats");
    
    res.status(200).json({
      success: true,
      message: "Site statistics updated successfully",
      data: stats,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const cachedStats = await redisClient.get("site_stats");

    if (cachedStats) {
      return res.json({
        success: true,
        data: JSON.parse(cachedStats),
      });
    }

    const stats = await SiteStats.findOne();

    await redisClient.set(
      "site_stats",
      JSON.stringify(stats),
      "EX",
      3600
    );

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;