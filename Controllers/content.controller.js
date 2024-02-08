const { Router } = require("express");
const { authentication } = require("../Middlewares/authentication");
const { Content } = require("../Models/content.model");
require("dotenv").config();

const contentController = Router();

contentController.get("/", authentication, async (req, res) => {
  const { id } = req.query;
  console.log("id", id)
  const data = await Content.find({ userId: id });
  res.send({ content: data });
});

contentController.post("/upload", authentication, async (req, res) => {
  try {
    const newContent = new Content(req.body);
    await newContent.save();
    res
      .status(200)
      .send({ success: true, msg: "Content uploaded successfully" });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).send({ error: "Upload failed" });
  }
});

module.exports = { contentController };
