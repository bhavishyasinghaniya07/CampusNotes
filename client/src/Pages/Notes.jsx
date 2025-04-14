import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Notes = () => {
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [notes, setNotes] = React.useState(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`/api/uploading/get/${params.notesId}`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setNotes(data.note);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [params.notesId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading Data....</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {notes && !loading && !error && (
        <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-md border">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            {notes.title}
          </h1>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4 relative">
            {/* Make the container relative so the button positions inside it */}
            <p className="text-gray-700">{notes.description}</p>

            {/* Share Button inside description */}
            <button
              onClick={handleShare}
              className="mt-4 bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700 transition duration-200"
            >
              {copied ? "✅ Copied!" : "🔗 Share"}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-6">
            <div>
              <span className="font-semibold text-gray-700">Subject:</span>{" "}
              {notes.subjectName}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Course:</span>{" "}
              {notes.courseName}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Semester:</span>{" "}
              {notes.semester}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Batch:</span>{" "}
              {notes.batch}
            </div>
            <div>
              <span className="font-semibold text-gray-700">College:</span>{" "}
              {notes.collegeName}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Uploaded On:</span>{" "}
              {new Date(notes.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="text-sm text-gray-700">
              👍{" "}
              <span className="font-semibold">{notes.likes?.length || 0}</span>{" "}
              Likes
            </div>
            <div className="text-sm text-gray-700">
              📥 <span className="font-semibold">{notes.downloadCount}</span>{" "}
              Downloads
            </div>
            <div className="text-sm text-gray-700">
              ✅ {notes.approved ? "Approved by Admin" : "Not Approved"}
            </div>
          </div>

          {notes.fileUrl && (
            <div className="mb-6">
              <a
                href={notes.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition duration-200"
              >
                📄 View or Download Notes
              </a>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Comments
            </h2>
            {notes.comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-3">
                {notes.comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-3 rounded-md shadow-sm border"
                  >
                    <p className="text-sm text-gray-800">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(comment.commentedAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Notes;
