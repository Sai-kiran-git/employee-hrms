const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.models.Recipient || mongoose.model("Recipient", recipientSchema);