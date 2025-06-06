import "../styles/editmodal.css";
import React, { useState } from "react";
import axios from "axios";
import "../styles/post.css";


const EditPostModal = ({ postId, currentTitle, currentText, onClose }) => {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [newText, setNewText] = useState(currentText);
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    if (!newTitle.trim() || !newText.trim()) return;
  
    try {
      setLoading(true);
      const res = await axios.post(
        "https://netwrk.onrender.com/api/v1/content/updatePost",
        {
          postId,
          newtitle: newTitle,
          newtext: newText,
        },
        { withCredentials: true }
      );
  
      console.log("Post updated:", res.data);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Update error:", err);
  
      // If error response exists, log the backend error response
      if (err.response) {
        console.error("Backend Error Response:", err.response.data);
        alert("Failed to update post. May be not your content");
      } else {
        // In case the error doesn't have a response (e.g., network error)
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Post</h2>
        <input
          className="edit-modal-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="edit-modal-textarea"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="What's on your mind?"
        />
        <div className="edit-modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
