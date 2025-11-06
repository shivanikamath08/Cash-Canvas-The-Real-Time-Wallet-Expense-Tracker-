const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (local)
mongoose.connect("mongodb://localhost:27017/expenseTracker")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Routes
app.use("/api/expenses", expenseRoutes);

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
