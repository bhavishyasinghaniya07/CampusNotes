import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Backend API
  withCredentials: true, // Ensure credentials (cookies) are sent with requests
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Use the correct token
  }, // Ensure credentials (cookies) are sent with requests
});

const BrowseNotes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [commentText, setCommentText] = useState("");

  // Fetch Notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes", {
        params: {
          search: search || "DBMS", // use current search value or default to 'DBMS'
        },
      });
      console.log(response.data); // Check the data
      setNotes(response.data.notes); // Update state with fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Like Note
  const likeNote = async (id) => {
    try {
      await api.put(`/notes/${id}/like`);
      fetchNotes(); // Refresh the notes list after like/unlike action
    } catch (err) {
      console.error("Error liking note:", err);
    }
  };

  const downloadFile = async (url, filename) => {
    if (!url) {
      console.error("File URL is invalid");
      return;
    }

    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || "download.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  // Open Comments Section for a Note
  const openComments = (note) => {
    setSelectedNote(note);
    setCommentText(""); // Clear the previous comment
  };

  // Add Comment
  const addComment = async () => {
    if (!commentText.trim()) return; // Do nothing if comment is empty
    try {
      console.log("Adding comment: ", commentText); // Check the comment text
      await api.post(`/notes/${selectedNote._id}/comment`, {
        text: commentText,
      });
      const updated = await api.get(`/notes?search=${selectedNote._id}`);
      setSelectedNote(updated.data.notes[0]);
      setCommentText("");
      fetchNotes(); // Refresh the list to sync comments count
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        📚 Shared Notes Platform
      </h1>

      {/* 🔍 Search */}
      <input
        type="text"
        className="border p-2 w-full mb-6 rounded"
        placeholder="Search by title, subject, or college..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📄 Notes List */}
      {!selectedNote ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note._id} className="bg-white shadow p-4 rounded-lg">
              <h2 className="font-bold text-xl mb-1">{note.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{note.description}</p>
              <p className="text-xs text-gray-500">
                📚 {note.subjectName || "N/A"} | 🎓 {note.collegeName || "N/A"}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <button
                  onClick={() => likeNote(note._id)}
                  className="text-red-600"
                >
                  ❤ {note.likes?.length || 0}
                </button>
                <button
                  onClick={() => openComments(note)}
                  className="text-blue-600"
                >
                  💬 {note.comments?.length || 0}
                </button>
                <button
                  onClick={() => downloadFile(note.fileUrl, note.title)}
                  className="text-green-600"
                >
                  ⬇ Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 💬 Comment Section
        <div className="bg-white shadow p-6 rounded-lg">
          <button
            onClick={() => setSelectedNote(null)}
            className="mb-4 text-sm text-gray-600 underline"
          >
            ← Back to Notes
          </button>
          <h2 className="text-2xl font-bold mb-2">{selectedNote.title}</h2>
          <p className="mb-4 text-gray-700">{selectedNote.description}</p>

          <textarea
            className="border p-2 w-full rounded"
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={addComment}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Comment
          </button>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">All Comments</h3>
            {selectedNote.comments.length === 0 && (
              <p className="text-gray-500">No comments yet.</p>
            )}
            {selectedNote.comments.map((c, idx) => (
              <div key={idx} className="border-b py-2">
                <p>{c.text}</p>
                <p className="text-xs text-gray-400">
                  {new Date(c.commentedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseNotes;
