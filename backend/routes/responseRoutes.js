import express from "express";
import {
  submitResponse,
  getFormResponses,
  getResponseCount,
  getSingleResponse,
} from "../controllers/responseController.js";
import { authMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();


router.post("/", upload.any(), submitResponse);

// Protected routes
router.get("/:formId", authMiddleware, getFormResponses);
router.get("/count/:formId", getResponseCount);
router.get("/single/:responseId", getSingleResponse);

export default router;
