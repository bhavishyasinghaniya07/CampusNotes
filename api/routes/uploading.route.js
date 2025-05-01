import express from "express";
import {
  notesUploading,
  deleteNotes,
  updateNotes,
  getNotes,
  uploadMiddleware,
} from "../controllers/uploading.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Middleware to check if there's any file content
const ensureFileContent = (req, res, next) => {
  // Ensure CORS headers are set
  res.header(
    "Access-Control-Allow-Origin",
    "https://campusnotes-amh9.onrender.com"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Check if there's either a file or a file URL in the request
  if (!req.file && !req.body.fileUrl && req.route.path !== "/update/:id") {
    return res.status(400).json({
      success: false,
      message:
        "No file content provided. Please upload a file or provide a file URL.",
    });
  }
  next();
};

// API Routes - simplify your routes and ensure CORS headers
router.options("/create", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://campusnotes-amh9.onrender.com"
  );
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

router.post(
  "/create",
  verifyToken,
  uploadMiddleware,
  ensureFileContent,
  notesUploading
);

router.delete("/delete/:id", verifyToken, deleteNotes);

router.post("/update/:id", verifyToken, uploadMiddleware, updateNotes);

router.get("/get/:id", getNotes);

export default router;
