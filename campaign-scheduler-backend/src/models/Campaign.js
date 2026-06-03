const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: String,
    subject: String,
    body: String,

    total: { type: Number, default: 0 },
    sent: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["pending", "running", "completed"],
      default: "pending",
    },

    startTime: Date,
    endTime: Date,
    timeTaken: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);