import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  url: String,
  type: {
    type: String,
    enum: ["image", "video"],
  },
});

const ContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ["hero", "about", "hero2", "hero3"],
    },

    media: [MediaSchema],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Content", ContentSchema);
