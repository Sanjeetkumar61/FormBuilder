import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js"; // ✅ MISSING THA
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

dotenv.config();

const app = express();

/* =========================
   DATABASE CONNECTION
========================= */
connectDB(); // ✅ YE LINE SABSE IMPORTANT HAI

/* =========================
   CORS (PRODUCTION SAFE)
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://form-builder-frontend-ashen.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});