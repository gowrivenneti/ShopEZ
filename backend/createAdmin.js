require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./model/userModel');

const createAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("12345678", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@shop.com",
      password: hashedPassword,
      role: "admin",
      avatar: {
        public_id: "demo",
        url: "https://picsum.photos/200"
      }
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
