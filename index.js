const express = require("express");
const cors = require("cors");
const { contentController } = require("./Controllers/content.controller");
const { connection } = require("./Config/db");
const { signupController } = require("./Controllers/signup.controller");
const { loginController } = require("./Controllers/login.controller");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/content", contentController);
app.use("/", signupController);
app.use("/", loginController);


const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`app is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log("err:", error);
  }
});
