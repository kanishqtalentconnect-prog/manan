import mongoose from "mongoose";

const siteStatsSchema = new mongoose.Schema(
  {
    transactionValue: {
      type: String,
      required: true,
      default: "0",
      trim: true,
    },
    happyCustomers: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const SiteStats = mongoose.model("SiteStats", siteStatsSchema);

export default SiteStats;