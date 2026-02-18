# 🛍️ ShopEZ - Full Stack E-Commerce Website

ShopEZ is a full-stack e-commerce web application built using the MERN stack.  
It includes user authentication, admin dashboard, product management, cart system, order processing, and Stripe payment integration.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Redux
- Tailwind CSS
- Material UI
- Stripe.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary (Image Upload)
- Stripe API (Payments)

---

## ✨ Features

### 👤 User Features
- User Registration & Login
- Browse Products
- Search & Filter Products
- Add to Cart
- Checkout Process
- Online Payment (Stripe)
- Order History
- Update Profile

### 🛠 Admin Features
- Admin Dashboard
- Add New Products
- Update Products
- Delete Products
- View All Orders
- Manage Users

---

## 💳 Payment Integration

Stripe test mode is integrated.

Use Stripe test card:

Card Number: `4242 4242 4242 4242`  
Expiry: Any future date  
CVC: Any 3 digits  

---

## 🖼 Image Upload

Images are uploaded using Cloudinary.

---

📸 Screenshots

<img width="1918" height="1122" alt="Screenshot 2026-02-19 000842" src="https://github.com/user-attachments/assets/388ccc22-c250-4ec2-a691-ae3023aa9248" />

<img width="1919" height="995" alt="image" src="https://github.com/user-attachments/assets/070224f7-7a83-4079-9db0-6351e4044025" />

<img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/aefb1f07-ba6c-4ada-9b81-808e149ca0b0" />

<img width="1919" height="994" alt="image" src="https://github.com/user-attachments/assets/941bb930-3659-4fe2-b0a4-fc064625a887" />


## 🛠 Installation Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/gowrivenneti/ShopEZ.git
cd ShopEZ
2️⃣ Install Backend Dependencie
cd backend
npm install

Create a .env file inside backend/config/ and add:
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_PUBLIC_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000

Run backend:
node server.js

3️⃣ Install Frontend Dependencies
cd ../frontend
npm install
npm start

🌐 Project Structure
ShopEZ
│
├── backend
├── frontend
└── README.md
🔒 Security
JWT Authentication

Password Hashing (bcrypt)

Role-Based Authorization

Protected Routes

Environment variables secured via .env

👩‍💻 Author
Lakshmi Gowri Venneti
GitHub: https://github.com/gowrivenneti

⭐ If you like this project, give it a star!


---

# 🚀 After Updating

Run:

```bash
git add README.md
git commit -m "Updated README to ShopEZ"
git push

**Happy Shopping!**

