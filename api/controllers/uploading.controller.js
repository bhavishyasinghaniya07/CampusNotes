import Note from "../models/uploading.model.js";
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
