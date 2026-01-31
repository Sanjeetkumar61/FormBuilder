import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import { errorHandler } from "./middleware/auth.js";

dotenv.config();

const app = express();


// CORS configuration - allow all origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
  })
);

// Additional CORS headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);


app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server OK",
  });
});


app.use(errorHandler);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


export default app;