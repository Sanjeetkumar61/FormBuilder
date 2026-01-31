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


app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);


app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server OK" });
});


app.use(errorHandler);


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}


export default app;