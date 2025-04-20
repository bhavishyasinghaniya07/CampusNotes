import Note from "../models/uploading.model.js";
import { errorHandler } from "../utils/error.js";
import fs from "fs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const upload = multer({ dest: "uploads/" });

export const notesUploading = async (req, res, next) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    // Check if we have a file or fileUrl
    let fileUrl = "";
    let fileName = "";
    let fileType = "";

    if (req.file) {
      // Extract file information - path should be available from Cloudinary
      fileUrl = req.file.path || req.file.secure_url || req.file.url || "";
      fileName = req.file.originalname || "Uploaded File";
      fileType = req.file.mimetype || "application/octet-stream";
    } else if (req.body.fileUrl) {
      fileUrl = req.body.fileUrl;
      fileName = req.body.fileName || "Unnamed from URL";
      fileType = req.body.fileType || "url";
    } else {
      return res.status(400).json({
        success: false,
        message: "No file or file URL provided",
      });
    }

    // Log the file details for debugging
    console.log("File URL:", fileUrl);
    console.log("File Name:", fileName);
    console.log("File Type:", fileType);

    // Get other form fields with default values if missing
    const title = req.body.title || "";
    const description = req.body.description || "";
    const collegeName = req.body.collegeName || "";
    const courseName = req.body.courseName || "";
    const batch = req.body.batch || "";
    const subjectName = req.body.subjectName || "";
    const semester = req.body.semester || "";
    const uploader = req.body.uploader || req.user?.id; // Fallback to the authenticated user's ID

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!collegeName) missingFields.push("collegeName");
    if (!courseName) missingFields.push("courseName");
    if (!batch) missingFields.push("batch");
    if (!subjectName) missingFields.push("subjectName");
    if (!semester) missingFields.push("semester");
    if (!uploader) missingFields.push("uploader");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Create a new note document
    const uploading = await Note.create({
      title,
      description,
      collegeName,
      courseName,
      batch,
      subjectName,
      semester,
      uploader,
      fileUrl,
      fileName,
      fileType,
    });

    console.log("Note uploaded successfully:", uploading);

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      data: uploading,
    });
  } catch (error) {
    console.error("Error uploading note:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error occurred",
    });
  }
};

export const deleteNotes = async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(errorHandler(404, "Notes not found"));
  }

  if (req.user.id !== note.uploader.toString()) {
    return next(errorHandler(401, "You can only delete your own uploads"));
  }

  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json("Notes has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateNotes = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    const note = await Note.findById(req.params.id);

    if (!note) {
      return next(errorHandler(404, "Notes not found"));
    }

    if (req.user.id !== note.uploader.toString()) {
      return next(errorHandler(401, "You can only update your own uploads"));
    }

    // Update file if present
    if (req.file) {
      // Extract file path from Cloudinary response
      const fileUrl =
        req.file.path || req.file.secure_url || req.file.url || "";
      const fileName = req.file.originalname || "Uploaded File";
      const fileType = req.file.mimetype || "application/octet-stream";

      note.fileUrl = fileUrl;
      note.fileName = fileName;
      note.fileType = fileType;
    } else if (req.body.fileUrl) {
      note.fileUrl = req.body.fileUrl;
      note.fileName = req.body.fileName || "File from URL";
      note.fileType = req.body.fileType || "application/octet-stream";
    }

    // Update other fields
    if (req.body.title) note.title = req.body.title;
    if (req.body.description) note.description = req.body.description;
    if (req.body.subjectName) note.subjectName = req.body.subjectName;
    if (req.body.collegeName) note.collegeName = req.body.collegeName;
    if (req.body.courseName) note.courseName = req.body.courseName;
    if (req.body.batch) note.batch = req.body.batch;
    if (req.body.semester) note.semester = req.body.semester;

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    next(error);
  }
};
export const getNotes = async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(errorHandler(404, "Notes not found"));
  }

  try {
    const update = await Note.findByIdAndUpdate(req.params.id);

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};
