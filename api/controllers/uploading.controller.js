import Note from "../models/uploading.model.js";
import { errorHandler } from "../utils/error.js";
import fs from "fs";

const upload = multer({ dest: "uploads/" });
import multer from "multer";

export const notesUploading = async (req, res, next) => {
  try {
    let fileUrl = "";
    let fileName = "";
    let fileType = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw", // Important for non-image files
        folder: "notes",
        public_id: `${Date.now()}-${req.file.originalname}`,
      });

      // Delete local file after upload
      fs.unlinkSync(req.file.path);

      fileUrl = result.secure_url;
      fileName = result.original_filename;
      fileType = result.format; // 'pdf', 'docx', etc.
    } else if (req.body.fileUrl) {
      fileUrl = req.body.fileUrl;
      fileName = req.body.fileName || "Unnamed from URL";
      fileType = "url";
    } else {
      return res.status(400).json({ message: "No file or file URL provided" });
    }

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

    return res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      data: uploading,
    });
  } catch (error) {
    console.error("Error uploading note:", error);
    next(error);
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
