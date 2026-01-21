import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";
// import Enquiry from "../models/Enquiry.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const siteVisits = await Booking.countDocuments();
    // Temporary placeholders until you add models
    const enquiries = 0;
    

    res.json({
      totalProperties,
      enquiries,
      siteVisits,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

export default router;
