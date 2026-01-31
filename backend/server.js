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


const allowedOrigins = [
  "http://localhost:5173", // local frontend (Vite)
  "http://localhost:3000", // optional
  "https://form-builder-frontend-ashen.vercel.app", // Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / postman / direct API calls
      if (!origin) return callback(null, true);

      // Allow requests from configured origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow localhost in any case
      if (origin.includes("localhost")) {
        return callback(null, true);
      }

      // Allow any Vercel frontend URLs
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      // In production, allow all origins (safe due to JWT authentication)
      if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


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