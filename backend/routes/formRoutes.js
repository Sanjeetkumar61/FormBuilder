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


router.post("/", authMiddleware, createForm);
router.get("/admin/my-forms", authMiddleware, getAllForms);
router.put("/:id", authMiddleware, updateForm);
router.delete("/:id", authMiddleware, deleteForm);


router.get("/public/available", getAllAvailableForms);
router.get("/:id", getFormById);

export default router;
