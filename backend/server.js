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
   CORS CONFIGURATION (FIXED)
========================= */
const allowedOrigins = [
   "https://form-builder-frontend-ashen.vercel.app",
   "http://localhost:5173",
   "http://localhost:3000"
];

const corsOptions = {
   origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true, // ✅ YEH BAHUT IMPORTANT HAI
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
   exposedHeaders: ["Authorization"],
   maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json());

/* =========================
   REQUEST LOGGING (for debugging)
========================= */
app.use((req, res, next) => {
   console.log(`${req.method} ${req.path}`);
   next();
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
   ERROR HANDLING
========================= */
app.use((err, req, res, next) => {
   console.error('Error:', err.message);
   res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error'
   });
});

/* =========================
   SERVER START
========================= */
// Check if running on Vercel (serverless)
const isVercel = process.env.VERCEL === '1';

if (!isVercel) {
   // Traditional server for Render/local development
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
   });
}

// Export for Vercel serverless
export default app;