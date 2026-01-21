import Booking from "../models/Booking.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, name, email, phone, visitDate, timeSlot, comingFrom } = req.body;

    if (!propertyId || !name || !email || !phone || !visitDate || !timeSlot || !comingFrom) {
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
      timeSlot,
      comingFrom
    });

    // 🔔 SEND EMAILS (do NOT block response if they fail)
    sendEmail({
      to: email,
      subject: "Site Visit Request Received",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your site visit request has been received.</p>

        <h4>Visit Details</h4>
        <ul>
          <li><strong>Date:</strong> ${new Date(visitDate).toDateString()}</li>
          <li><strong>Time Slot:</strong> ${timeSlot}</li>
          <li><strong>Coming From:</strong> ${comingFrom}</li>
        </ul>

        <p>Our team will confirm your visit shortly.</p>
        <p>Thank you!</p>
      `,
    });

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Site Visit Booking",
      html: `
        <h3>New Site Visit Booking</h3>

        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Date:</strong> ${new Date(visitDate).toDateString()}</li>
          <li><strong>Time Slot:</strong> ${timeSlot}</li>
          <li><strong>Coming From:</strong> ${comingFrom}</li>
        </ul>
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

        <p>Your site visit has been <strong>${status.toUpperCase()}</strong>.</p>

        <h4>Visit Details</h4>
        <ul>
          <li><strong>Date:</strong> ${new Date(
            booking.visitDate
          ).toDateString()}</li>
          <li><strong>Time Slot:</strong> ${booking.timeSlot}</li>
          <li><strong>Coming From:</strong> ${booking.comingFrom}</li>
        </ul>

        ${
          status === "confirmed"
            ? "<p>We look forward to meeting you!</p>"
            : "<p>Please feel free to rebook anytime.</p>"
        }
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
