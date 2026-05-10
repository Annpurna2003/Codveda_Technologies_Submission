import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import Routes
import userrouter from "./routes/useroutes.js";
import supplierrouter from "./routes/supplieroutes.js";
import itemrouter from "./routes/itemroutes.js";
import transactionrouter from "./routes/transactionroutes.js";
import stockrouter from "./routes/stockroutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userrouter);
app.use("/api/supplier", supplierrouter);
app.use("/api/item", itemrouter);
app.use("/api/transaction", transactionrouter);
app.use("/api/stock", stockrouter);
// app.use("/api/report", reportrouter);

// Default Route
app.get("/", (req, res) => {
  res.send("✅ Store Management API is running...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected...");
  // Start server only after DB connection
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);

  });
})
.catch((error) => {
  console.error("❌ MongoDB connection failed:", error.message);
});

//GgLP6bDtnzOjWxQG