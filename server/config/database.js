const mongoose = require("mongoose");
require("dotenv").config();

// Debugging: Check if MONGODB_URL is loaded correctly
console.log("MongoDB URL:", process.env.MONGODB_URL || "❌ MONGODB_URL NOT FOUND");

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ DB Connected Successfully"))
    .catch((error) => {
        console.log("❌ DB Connection Failed");
        console.error(error);
        process.exit(1);
    });
};
