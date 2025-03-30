const Razorpay = require("razorpay");

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY || "default_key",      // Default value
    key_secret: process.env.RAZORPAY_SECRET || "default_secret", // Default value
});
