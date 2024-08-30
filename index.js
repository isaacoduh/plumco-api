const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({});

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const addressRoutes = require("./routes/address.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");
const searchRoutes = require("./routes/search.routes");

const adminProductRoutes = require("./routes/admin/product.routes");
const adminOrderRoutes = require("./routes/admin/order.routes");

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log(`MongoDB Connected!`))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://your-production-domain.com",
  "http://localhost:5173",
]; // Add your allowed origins here

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// cors configuration
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/admin/products", adminProductRoutes);
app.use("/api/v1/admin/orders", adminOrderRoutes);

app.listen(PORT, () => console.log(`PlumCO API Server Started on ${PORT}`));
