import Booking from "../models/booking.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, name, email, phone, visitDate } = req.body;

    if (!propertyId || !name || !email || !phone || !visitDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const booking = await Booking.create({
      property: propertyId,
      name,
      email,
      phone,
      visitDate,
    });

    // 🔔 SEND EMAILS (do NOT block response if they fail)
    sendEmail({
      to: email,
      subject: "Site Visit Request Received",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your site visit request has been received.</p>
        <p><strong>Date:</strong> ${new Date(visitDate).toDateString()}</p>
        <p>We will confirm shortly.</p>
      `,
    });

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Site Visit Booking",
      html: `
        <h3>New Booking</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${new Date(visitDate).toDateString()}</p>
      `,
    });

    // ✅ RESPONSE LAST
    return res.status(201).json({
      message: "Site visit booked successfully",
      booking,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to book site visit",
    });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property", "title propertyType")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔔 EMAIL USER (non-blocking)
    sendEmail({
      to: booking.email,
      subject:
        status === "confirmed"
          ? "Your Site Visit is Confirmed"
          : "Your Site Visit is Cancelled",
      html: `
        <h2>Hello ${booking.name},</h2>
        <p>Your site visit has been <strong>${status}</strong>.</p>
        <p><strong>Date:</strong> ${new Date(
          booking.visitDate
        ).toDateString()}</p>
      `,
    });

    // ✅ RESPONSE LAST
    return res.json({
      message: "Booking status updated",
      booking,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to update booking",
    });
  }
};
