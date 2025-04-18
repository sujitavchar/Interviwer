import React, { useState } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaTrash,
  FaEllipsisH,
} from "react-icons/fa";
import "../styles/post.css";
import EditPostModal from "./EditPostModal";
import axios from "axios";

const Post = ({
  postId,
  user,
  time,
  title,
  text,
  image,
  likes,
  comments,
  shares,
  onDelete,
  currentUserId,
}) => {
  const {
    name = "Unknown User",
    profilePic = "https://i.pravatar.cc/40",
    id: ownerId,
  } = user || {};

  // Safely initialize with array
  const initialComments = Array.isArray(comments) ? comments : [];

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState(initialComments);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const words = text.split(" ");
  const wordLimit = 50;

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const toggleOptionsMenu = () => setShowOptions(!showOptions);

  const toggleCommentBox = async () => {
    const newState = !isCommentBoxOpen;
    setIsCommentBoxOpen(newState);
  
    if (newState && commentList.length === 0) {
      try {
        const res = await axios.get(
          `https://interviwer-production.up.railway.app/api/v1/comments/getcomments/${postId}`,
          { withCredentials: true }
        );
  
        console.log("Fetched Comments Raw Response:", res.data);
  
        const fetchedComments = Array.isArray(res.data?.data) ? res.data.data : [];
  
        // Normalize for UI
        const normalizedComments = fetchedComments.map((comment) => ({
          id: comment._id,
          name: comment.userName || "Unknown",
          text: comment.text,
          time: new Date(comment.createdAt).toLocaleString(),
          profilePic: "https://i.pravatar.cc/40", // or fetch from user later
          isOwner: comment.userName === user?.name, // check if it's user's comment
        }));
  
        setCommentList(normalizedComments);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        alert("Error loading comments");
        setCommentList([]);
      }
    }
  };
  

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = async () => {
    const trimmedText = commentText.trim();
    if (!trimmedText) return;
  
    try {
      const res = await axios.post(
        `https://interviwer-production.up.railway.app/api/v1/comments/addcomment/${postId}`,
        { ctext: trimmedText },
        { withCredentials: true }
      );
  
      const newComment = {
        id: res.data?.data?._id || Date.now(), // fallback id
        name: "You",
        profilePic: "https://i.pravatar.cc/40?img=3",
        text: trimmedText,
        time: "Just now",
        isOwner: true,
      };
  
      setCommentList([newComment, ...commentList]);
      setCommentText("");
      alert("Comment posted successfully !")
    } catch (error) {
      console.error("Failed to post comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };
  

  const handleDeleteComment = (id) => {
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };

  const handleDeletePost = async () => {
    if (ownerId !== currentUserId) {
      alert("Not your content...");
      return;
    }

    try {
      await axios.delete(
        "https://interviwer-production.up.railway.app/api/v1/content/deletePost",
        {
          data: { postId },
          withCredentials: true,
        }
      );
      if (onDelete) onDelete(postId);
      alert("Post deleted successfully ! 🎉");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post, maybe you are not the owner");
    }
  };

  return (
    <div className={`post-container ${isExpanded ? "expanded" : ""}`}>
      <div className="post-header">
        <img src={profilePic} alt="User" className="profile-pic" />
        <div className="post-info">
          <p className="user-name">{name}</p>
          <p className="post-time">{time} ago</p>
        </div>
        <div className="options-menu">
          <button className="options-btn" onClick={toggleOptionsMenu}>
            <FaEllipsisH size={20} />
          </button>
          {showOptions && (
            <div className="options-dropdown">
              <button onClick={() => setIsEditModalOpen(true)}>Edit</button>
              <button onClick={handleDeletePost}>Delete</button>
            </div>
          )}
        </div>
      </div>

      {title && <h3 className="post-title">{title}</h3>}

      <p className="post-text">
        {isExpanded || words.length <= wordLimit
          ? text
          : `${words.slice(0, wordLimit).join(" ")}...`}
      </p>

      {words.length > wordLimit && (
        <button className="read-more-btn" onClick={toggleReadMore}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}

      {image && (
        <div className="post-image-container">
          <img src={image} alt="Post" className="post-image" />
        </div>
      )}

      <div className="post-actions">
        <button
          className={`action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLikeToggle}
        >
          <FaThumbsUp size={18} color={isLiked ? "blue" : "black"} />
          {isLiked ? "Liked" : "Like"} <span>{likeCount}</span>
        </button>
        <button className="action-btn" onClick={toggleCommentBox}>
          <FaComment size={18} /> Comment <span>{commentList.length}</span>
        </button>
        <button className="action-btn">
          <FaShare size={18} /> Share <span>{shares}</span>
        </button>
      </div>

      {isCommentBoxOpen && (
        <div className="comment-section">
          <div className="comment-box">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button className="submit-btn" onClick={handleCommentSubmit}>
              Submit
            </button>
          </div>

          <div className="comment-list">
            {commentList.length === 0 ? (
              <p className="no-comments">
                No comments to display, be the first to comment.
              </p>
            ) : (
              commentList.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img
                    src={comment.profilePic}
                    alt="User"
                    className="comment-profile-pic"
                  />
                  <div className="comment-content">
                    <p className="comment-user">
                      {comment.name}
                      <span className="comment-time"> · {comment.time}</span>
                    </p>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                  {comment.isOwner && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <FaTrash size={14} color="red" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <EditPostModal
          postId={postId}
          currentTitle={title}
          currentText={text}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Post;
