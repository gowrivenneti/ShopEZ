require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./model/productModel');

connectDB();

const products = [
  {
    name: "Demo Laptop",
    description: "High performance laptop",
    category: "Electronics",
    brand: "SmartBrand",
    price: 45000,
    quantity: 10,
    ratings: 4,
    images: [
      {
        public_id: "demo",
        url: "https://picsum.photos/300"
      }
    ],
    numOfReviews: 0,
    reviews: []
  }
];

const seed = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Database seeded ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
