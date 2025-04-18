import Note from "../models/uploading.model.js";
import { errorHandler } from "../utils/error.js";
import fs from "fs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const upload = multer({ dest: "uploads/" });

export const notesUploading = async (req, res, next) => {
  try {
    let fileUrl = "";
    let fileName = "";
    let fileType = "";

    // Check if a file has been uploaded
    if (req.file) {
      fileUrl = req.file.path || req.file.secure_url;
      fileName = req.file.originalname;
      fileType = req.file.mimetype;
    } else if (req.body.fileUrl) {
      fileUrl = req.body.fileUrl;
      fileName = req.body.fileName || "Unnamed from URL";
      fileType = "url";
    } else {
      return res.status(400).json({ message: "No file or file URL provided" });
    }

    // Ensure all required fields are included in the request body
    const {
      title,
      description,
      collegeName,
      courseName,
      batch,
      subjectName,
      semester,
      uploader,
    } = req.body;

    // Create a new note document with the provided information and file details
    const uploading = await Note.create({
      title,
      description,
      collegeName,
      courseName,
      batch,
      subjectName,
      semester,
      uploader, // Make sure `uploader` is a valid ObjectId
      fileUrl,
      fileName,
      fileType,
    });

    console.log("Note uploaded successfully:", uploading);

    // Return success response with the newly created note
    return res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      data: uploading,
    });
  } catch (error) {
    console.error("Error uploading note:", error);
    next(error); // Pass error to the next middleware (error handler)
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

export const updateNotes = [
  upload.single("file"), // middleware to handle file or form data
  async (req, res, next) => {
    try {
      const note = await Note.findById(req.params.id);

      if (!note) {
        return next(errorHandler(404, "Notes not found"));
      }

      if (req.user.id !== note.uploader.toString()) {
        return next(errorHandler(401, "You can only update your own uploads"));
      }

      // Update file if present
      if (req.file) {
        note.filePath = req.file.path;
        note.originalName = req.file.originalname;
      } else if (req.body.fileUrl) {
        note.filePath = req.body.fileUrl;
        note.originalName = req.body.fileName || "File from URL";
      }

      // Update other fields
      if (req.body.title) note.title = req.body.title;
      if (req.body.description) note.description = req.body.description;
      if (req.body.subjectName) note.subjectName = req.body.subjectName; // Update subject
      if (req.body.collegeName) note.collegeName = req.body.collegeName; // Update college name
      if (req.body.courseName) note.courseName = req.body.courseName; // Update course name
      if (req.body.batch) note.batch = req.body.batch; // Update batch
      if (req.body.semester) note.semester = req.body.semester; // Update semester

      await note.save();

      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  },
];

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
