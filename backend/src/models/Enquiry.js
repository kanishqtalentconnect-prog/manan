import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bestTimeToReach: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
