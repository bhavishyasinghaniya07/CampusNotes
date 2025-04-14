import Notes from "../models/uploading.model.js";

// 🔍 Get all notes with optional search/filter
export const getAllNotes = async (req, res, next) => {
  try {
    const { search, subject, college, semester, course, batch } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subjectName: { $regex: search, $options: "i" } },
        { collegeName: { $regex: search, $options: "i" } },
        { courseName: { $regex: search, $options: "i" } },
      ];
    }

    if (subject) query.subjectName = subject;
    if (college) query.collegeName = college;
    if (semester) query.semester = semester;
    if (course) query.courseName = course;
    if (batch) query.batch = batch;

    const notes = await Notes.find(query)
      .populate("uploader", "name avatar") // if avatar added
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, notes });
  } catch (err) {
    next(err);
  }
};

// ❤ Like/unlike note
export const likeNote = async (req, res, next) => {
  try {
    const note = await Notes.findById(req.params.id);
    const userId = req.user.id;

    if (!note) return res.status(404).json({ message: "Note not found" });

    const index = note.likes.indexOf(userId);
    if (index === -1) {
      note.likes.push(userId);
    } else {
      note.likes.splice(index, 1);
    }

    await note.save();
    res.status(200).json({ success: true, likes: note.likes });
  } catch (err) {
    next(err);
  }
};

// 💬 Comment on note
export const commentOnNote = async (req, res, next) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const comment = {
      user: req.user.id,
      text: req.body.text,
      commentedAt: new Date(),
    };

    note.comments.push(comment);
    await note.save();

    const updatedNote = await Notes.findById(req.params.id).populate(
      "comments.user",
      "name"
    );

    res.status(200).json({ success: true, comments: updatedNote.comments });
  } catch (err) {
    next(err);
  }
};

// ⬇ Increment download count
export const incrementDownload = async (req, res, next) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.downloadCount += 1;
    await note.save();

    res.status(200).json({ success: true, downloadCount: note.downloadCount });
  } catch (err) {
    next(err);
  }
};
