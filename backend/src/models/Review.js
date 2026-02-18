import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    propertyBought: {
      type: String,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be an integer between 1 and 5",
      },
    },

    image: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      index: true, // helps for filtering verified reviews
    },
  },
  { timestamps: true }
);

/* Index for faster queries */
reviewSchema.index({ isVerified: 1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);
