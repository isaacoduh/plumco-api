const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config({});

// Admin user details
const adminUser = {
  username: "admin",
  email: "admin@gmail.com",
  password: "password", // Plain text password
  firstname: "Admin",
  lastname: "User",
  role: "admin",
};

// Function to create an admin user
const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const user = await User.findOne({ email: adminUser.email });
    if (user) {
      console.log("Admin user already exists");
      mongoose.connection.close();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminUser.password, 12);
    adminUser.password = hashedPassword;

    // Create the admin user
    await User.create(adminUser);
    console.log("Admin user created successfully");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Run the createAdminUser function
createAdminUser();
