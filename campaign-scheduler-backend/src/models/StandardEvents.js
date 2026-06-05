const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
  {
    key: { type: String },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const standardEventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    action: { type: String, required: true },
    label: { type: String, default: "" },
    screen: { type: String, default: "" },
    category: { type: String, required: true },
    sessionStart: { type: String, default: "" },
    createdDatetime: { type: Date, required: true },
    projectName: { type: String, required: true },
    userId: { type: Number, required: true },
    attributes: [attributeSchema],
    // batchId: { type: String },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    // processedAt: { type: Date, default: Date.now }, 
  },
  {
    timestamps: true,
    collection: "standard_events", 
  }
);

module.exports = mongoose.model("StandardEvent", standardEventSchema);