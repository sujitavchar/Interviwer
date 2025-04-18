import React, { useEffect, useState } from "react";
import "../styles/createpost.css";
import axios from "axios";

// Initialize GoogleGenAI with your API key
//const ai = new GoogleGenAI({ apiKey: "AIzaSyBShrnrISxlfemGMkYQ4BZ0K9-mCj_ZMpY" });

const CreatePost = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be below 5MB.");
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !postText.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", postText);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      await axios.post(
        "https://interviwer-production.up.railway.app/api/v1/content/createpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, 
        }
      );
      alert("Post created successfully 🎉");
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleRewriteAI = async () => {
    setAiLoading(true);
  
    try {
      const enhancedText = postText + " Enhance the text before this line. Correct grammar and punctuation. Don't provide any extra information.";
  
      const response = await axios.post("https://interviwer-production.up.railway.app/api/v1/content/enhance-text", {
        postText: enhancedText,
      },
      { withCredentials: true });
  
      setPostText(response.data.enhancedText || postText);
    } catch (error) {
      console.error("Error with AI rewrite:", error);
      alert("Failed to rewrite with AI");
    } finally {
      setAiLoading(false);
    }
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="post-header">
          <span className="username">Create a Post</span>
        </div>

        {/* Title Field */}
        <input
          className="post-title"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Textarea */}
        <textarea
          className="post-input"
          placeholder="What do you want to talk about?"
          autoFocus
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        {/* Footer */}
        <div className="post-footer">
          <button
            className="rewrite-ai-btn"
            onClick={handleRewriteAI}
            disabled={aiLoading} // Disable if AI is in progress
          >
            {aiLoading ? "Rewriting..." : "✨ Rewrite with AI"}
          </button>

          <button
            className="add-media-btn"
            onClick={() => document.getElementById("imageInput").click()}
          >
            📷 Add Media
          </button>
          <input
            type="file"
            id="imageInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />

          <button
            className="post-btn"
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !postText.trim()}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
