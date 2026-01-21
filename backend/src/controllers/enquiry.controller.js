import Enquiry from "../models/Enquiry.js";
import Property from "../models/Property.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createEnquiry = async (req, res) => {
  try {
    const { propertyId, name, email, phone, bestTimeToReach, question } = req.body;

    if (!propertyId || !name || !email || !phone || !bestTimeToReach || !question) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    
    const  property = await Property.findById(propertyId);

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

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });

    /* ========= EMAIL TO USER ========= */
    await sendEmail({
      to: email,
      subject: "We received your enquiry",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to us.</p>

        <p><strong>Your Question:</strong></p>
        <p>${question}</p>

        <p><strong>Best Time to Reach You:</strong> ${bestTimeToReach}</p>

        <p>Our team will contact you shortly.</p>
      `,
    });

    /* ========= EMAIL TO ADMIN ========= */
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Property Enquiry",
      html: `
        <h3>New Enquiry Received</h3>

        <p><strong>Property:</strong> ${property.title}</p>

        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Best Time:</strong> ${bestTimeToReach}</li>
        </ul>

        <p><strong>Question:</strong></p>
        <p>${question}</p>
      `,
    });

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

