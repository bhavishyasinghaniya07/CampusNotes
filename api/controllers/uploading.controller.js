import Note from "../models/uploading.model.js";
import { errorHandler } from "../utils/error.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" }); // or configure as per your setup

export const notesUploading = async (req, res, next) => {
  try {
    let fileUrl = "";
    let fileName = "";
    let fileType = "";

    // Check if a file has been uploaded
    if (req.file) {
      // Multer handled the file upload, so we retrieve the file URL and name
      fileUrl = req.file.path;
      fileName = req.file.originalname;
      fileType = req.file.mimetype;
    }
    // If no file uploaded, but a file URL is provided in the body
    else if (req.body.fileUrl) {
      fileUrl = req.body.fileUrl;
      fileName = req.body.fileName || "Unnamed from URL";
      fileType = "url"; // You can handle this as a special case
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
      if (req.body.subject) note.subject = req.body.subject;
      if (req.body.description) note.description = req.body.description;
      if (req.body.semester) note.semester = req.body.semester;
      // Add more fields as needed...

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
