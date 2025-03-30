import React, { useEffect, useState } from "react";
import "../styles/createpost.css"; 
import profileIcon from "../assets/profile_image_icon.png";

const CreatePost = ({ isOpen, onClose }) => {
  const [postText, setPostText] = useState(""); // Track input

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header Section */}
        <div className="post-header">
          <img src={profileIcon} alt="User Avatar" className="avatar" />
          <span className="username">Sujit Avchar</span>
        </div>

        {/* Input Area */}
        <textarea
          className="post-input"
          placeholder="What do you want to talk about?"
          autoFocus
          value={postText}
          onChange={(e) => setPostText(e.target.value)} // Update state
        />

        {/* Footer Section */}
        <div className="post-footer">
          <button className="rewrite-ai-btn">✨ Rewrite with AI</button>
          <button className="add-media-btn">📷 Add Media</button>
          <button 
            className="post-btn" 
            disabled={!postText.trim()} // Button is only disabled when input is empty
          >
            Post
          </button> 
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
