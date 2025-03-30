const Razorpay = require("razorpay");
require("dotenv").config();

let instance = null;

if (process.env.RAZORPAY_KEY && process.env.RAZORPAY_SECRET) {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
} else {
  console.warn("⚠️ Warning: Razorpay is not initialized because RAZORPAY_KEY or RAZORPAY_SECRET is missing.");
}

exports.instance = instance;
