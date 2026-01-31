import express from "express";
import {
  adminLogin,
  adminRegister,
  getAdminProfile,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/profile", authMiddleware, getAdminProfile);

export default router;
