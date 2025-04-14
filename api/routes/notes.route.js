import express from "express";
import {
  getAllNotes,
  likeNote,
  commentOnNote,
  incrementDownload,
} from "../controllers/notes.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getAllNotes); // Get all notes
router.put("/:id/like", verifyToken, likeNote); // Like/unlike
router.post("/:id/comment", verifyToken, commentOnNote); // Comment
router.put("/:id/download", incrementDownload); // Increment download count

export default router;
