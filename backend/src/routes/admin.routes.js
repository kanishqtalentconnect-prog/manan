import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";
import Enquiry from "../models/Enquiry.js";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const siteVisits = await Booking.countDocuments();
    const enquiries = await Enquiry.countDocuments();
    const categories = await Category.countDocuments();
    
    res.json({
      totalProperties,
      enquiries,
      siteVisits,
      categories,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

export default router;
