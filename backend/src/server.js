const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Second Brain API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});