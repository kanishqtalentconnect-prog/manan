import Enquiry from "../models/Enquiry.js";
import Property from "../models/Property.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendWhatsapp } from "../utils/sendWhatsapp.js";

export const createEnquiry = async (req, res) => {
  try {
    const {
      propertyId,
      name,
      email,
      phone,
      bestTimeToReach,
      question,
    } = req.body;

    if (
      !propertyId ||
      !name ||
      !email ||
      !phone ||
      !bestTimeToReach ||
      !question
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const enquiry = await Enquiry.create({
      property: property._id,
      propertyTitle: property.title,
      name,
      email,
      phone,
      bestTimeToReach,
      question,
    });

    const propertyName = property.title;
    const location =
      property.googleLocationUrl || "Location will be shared soon";

    // ✅ RESPONSE FIRST (non-blocking notifications)
    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });

    /* ========= USER EMAIL ========= */
    sendEmail({
      to: email,
      subject: "We received your enquiry",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to us.</p>

        <p><strong>Property:</strong> ${propertyName}</p>

        <p><strong>Your Question:</strong></p>
        <p>${question}</p>

        <p><strong>Best Time to Reach You:</strong> ${bestTimeToReach}</p>

        <p><strong>Location:</strong><br/>
        <a href="${location}" target="_blank">View on Google Maps</a></p>

        <p>Our team will contact you shortly.</p>
      `,
    });

    /* ========= USER WHATSAPP ========= */
    // sendWhatsapp({
    //   to: phone,
    //   message: {
    //     type: "template",
    //     template: {
    //       id: "property_enquiry_user",
    //       params: [
    //         name,
    //         propertyName,
    //         bestTimeToReach,
    //         question,
    //         location,
    //       ],
    //     },
    //   },
    // });

    /* ========= ADMIN EMAIL ========= */
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Property Enquiry",
      html: `
        <h3>New Enquiry Received</h3>

        <p><strong>Property:</strong> ${propertyName}</p>

        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Best Time:</strong> ${bestTimeToReach}</li>
        </ul>

        <p><strong>Question:</strong></p>
        <p>${question}</p>

        <p><strong>Location:</strong><br/>
        <a href="${location}" target="_blank">View on Google Maps</a></p>
      `,
    });

    /* ========= ADMIN WHATSAPP ========= */
    // sendWhatsapp({
    //   to: process.env.ADMIN_PHONE,
    //   message: {
    //     type: "template",
    //     template: {
    //       id: "property_enquiry_admin",
    //       params: [
    //         propertyName,
    //         name,
    //         phone,
    //         email,
    //         bestTimeToReach,
    //         question,
    //         location,
    //       ],
    //     },
    //   },
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to submit enquiry",
    });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("property", "title")
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};