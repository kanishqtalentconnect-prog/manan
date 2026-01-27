import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    price: Number,
    area: Number,
    bedrooms: Number,
    bathrooms: Number,
    area: {
      type: Number,
    },
    dimensions: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [String],
    googleMapUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["available", "sold", "under_construction"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
