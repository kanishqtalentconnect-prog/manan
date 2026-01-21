import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createBooking);

// ADMIN
router.get("/", protect, adminOnly, getAllBookings);
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;