const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { cloudinaryConnect } = require("./config/cloudinary");
const database = require("./config/database");

// Routes Import
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Server Port
const PORT = process.env.PORT || 5000;

// Database Connection
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// File Upload Setup
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
  })
);

// Cloudinary Connection
cloudinaryConnect();

// API Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "src", "dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "src", "dist", "index.html"));
});

// Start Server (Only one `app.listen`)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ App is running at ${PORT}`);
});
