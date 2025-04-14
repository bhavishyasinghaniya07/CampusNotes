import express from "express";
import {
  notesUploading,
  deleteNotes,
  updateNotes,
  getNotes,
} from "../controllers/uploading.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// 🔧 Cloudinary Config
cloudinary.config({
  cloud_name: "dinn2svqr",
  api_key: "477623572645727",
  api_secret: "58Bj2smsT6A0oV2bL9gDa-pKIOY", // Click 'View API Keys' above to copy your API secret
});

// 📦 Setup storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    resource_type: "raw",
    folder: "notes", // Cloudinary folder
    allowed_formats: ["pdf", "doc", "docx", "txt"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// 🚀 Upload route with file handling
router.post("/upload", verifyToken, upload.single("file"), notesUploading);

router.delete("/delete/:id", verifyToken, deleteNotes);
router.post("/update/:id", verifyToken, updateNotes);
router.get("/get/:id", getNotes);

export default router;
