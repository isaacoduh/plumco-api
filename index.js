const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({});

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log(`MongoDB Connected!`))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// cors configuration
app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log(`PlumCO API Server Started on ${PORT}`));
