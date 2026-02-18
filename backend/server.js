process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥:", err);
  process.exit(1);
});

const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, 'config', '.env') }); // ✅ LOAD .env correctly

const app = require('./app');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary');

// Connect DB
connectDB();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}...`);
});
