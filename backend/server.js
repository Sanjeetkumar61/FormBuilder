import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

dotenv.config();

const app = express();

/* =========================
   DATABASE
========================= */
connectDB();

/* =========================
   CORS (VERCEL + RENDER SAFE)
========================= */
app.use(
   cors({
      origin: [
         "https://form-builder-frontend-ashen.vercel.app",
         "http://localhost:5173",
         "http://localhost:3000",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
   })
);

app.use(express.json());

/* =========================
   ROOT ROUTE (FIXED)
========================= */
app.get("/", (req, res) => {
   res.send("API is running...");
});

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (req, res) => {
   res.json({ success: true, message: "Server OK" });
});

/* =========================
   SERVER (RENDER)
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});