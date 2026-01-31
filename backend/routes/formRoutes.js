import express from "express";
import {
  createForm,
  getAllForms,
  getAllAvailableForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/formController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Protected routes (require admin authentication)
router.post("/", authMiddleware, createForm);
router.get("/admin/my-forms", authMiddleware, getAllForms); // Admin's forms only
router.put("/:id", authMiddleware, updateForm);
router.delete("/:id", authMiddleware, deleteForm);

// Public routes (no authentication required)
router.get("/public/available", getAllAvailableForms); // All available forms for users
router.get("/:id", getFormById); // Public access to single form

export default router;
