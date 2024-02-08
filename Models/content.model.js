const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileurl: { type: String, required: false },
  userId: { type: String, required: true },
  createdAt: { type: String, required: true }
});

const Content = mongoose.model("content", contentSchema);

module.exports = { Content };
