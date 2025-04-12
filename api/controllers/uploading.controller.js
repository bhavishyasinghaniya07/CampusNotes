import Note from "../models/uploading.model.js";

export const notesUploading = async (req, res, next) => {
  try {
    const uploading = await Note.create(req.body);
    return res.status(201).json(uploading);
  } catch (error) {
    next(error);
  }
};
