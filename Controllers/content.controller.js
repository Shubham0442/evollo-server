const { Router } = require("express");
const multer = require("multer");
const { authentication } = require("../Middlewares/authentication");
const { Content } = require("../Models/content.model");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const contentController = Router();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req.file.filename);
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log(req.file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix + ".png");
  }
});

const upload = multer({ storage: storage });

contentController.post(
  "/upload",
  authentication,
  upload.single("fileurl"),
  async (req, res) => {
    try {
      const file = req.file;

      console.log(req.body);
      const result = await cloudinary.uploader.upload(file.path);

      const newContent = new Content({
        ...req.body,
        fileurl: result.secure_url
      });

      await newContent.save();

      res
        .status(200)
        .json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ success: false, error: "Upload failed" });
    }
  }
);

contentController.get("/", authentication, async (req, res) => {
  const { id } = req.query;
  // console.log("id", id);
  const data = await Content.find({ userId: id });
  res.send({ content: data });
});

module.exports = { contentController };
