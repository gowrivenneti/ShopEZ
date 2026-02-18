const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");

// payment requires login
router.route("/payment/process").post(auth, processPayment);

// public key — no auth needed
router.route("/stripeapi").get(sendStripeApiKey);

module.exports = router;
