const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    const uri = process.env.MONGODB_URL;

    console.log("🔍 MONGODB_URL:", uri); // Debugging ke liye

    if (!uri) {
        console.warn("⚠️ Warning: MongoDB is not connected because MONGODB_URL is missing.");
        return;
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ DB Connected Successfully"))
    .catch((error) => {
        console.error("❌ DB Connection Failed", error);
        process.exit(1);
    });
};
