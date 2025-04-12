import express from "express";
import { notesUploading } from "../controllers/uploading.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/upload", verifyToken, notesUploading);

export default router;
