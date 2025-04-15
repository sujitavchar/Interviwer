import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare, FaTrash, FaEllipsisH } from "react-icons/fa";
import "../styles/post.css";

const Post = ({ user, time, title, text, image, likes, comments, shares, onEdit, onDelete }) => {
  const {
    name = "Unknown User",
    profilePic = "https://i.pravatar.cc/40",
  } = user || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      profilePic: "https://i.pravatar.cc/40?img=1",
      text: "Great post! Thanks for sharing.",
      time: "2h",
      isOwner: false,
    },
    {
      id: 2,
      name: "Mark Evans",
      profilePic: "https://i.pravatar.cc/40?img=2",
      text: "This is really helpful.",
      time: "1h",
      isOwner: false,
    },
  ]);
  const [showOptions, setShowOptions] = useState(false); // State for the three-dot menu

  const words = text.split(" ");
  const wordLimit = 50;

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const toggleCommentBox = () => {
    setIsCommentBoxOpen(!isCommentBoxOpen);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: commentList.length + 1,
        name: "You",
        profilePic: "https://i.pravatar.cc/40?img=3",
        text: commentText,
        time: "Just now",
        isOwner: true,
      };

      setCommentList([newComment, ...commentList]);
      setCommentText("");
    }
  };

  const handleDeleteComment = (id) => {
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };

  const toggleOptionsMenu = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={`post-container ${isExpanded ? "expanded" : ""}`}>
      {/* Header Section */}
      <div className="post-header">
        <img src={profilePic} alt="User" className="profile-pic" />
        <div className="post-info">
          <p className="user-name">{name}</p>
          <p className="post-time">{time} ago</p>
        </div>

        {/* Three Dot Menu */}
        <div className="options-menu">
          <button className="options-btn" onClick={toggleOptionsMenu}>
            <FaEllipsisH size={20} />
          </button>

          {showOptions && (
            <div className="options-dropdown">
              <button className="option-item" onClick={onEdit}>Edit</button>
              <button className="option-item" onClick={onDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>

      {/* Post Title */}
      {title && <h3 className="post-title">{title}</h3>}

      {/* Post Content */}
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

      {/* Image Section */}
      {image && (
        <div className="post-image-container">
          <img src={image} alt="Post" className="post-image" />
        </div>
      )}

      {/* Actions */}
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

      {/* Inline Comment Box & Comments Section */}
      {isCommentBoxOpen && (
        <div className="comment-section">
          {/* Comment Input Box */}
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

          {/* Display Previous Comments */}
          <div className="comment-list">
            {commentList.map((comment) => (
              <div key={comment.id} className="comment-item">
                <img
                  src={comment.profilePic}
                  alt="User"
                  className="comment-profile-pic"
                />
                <div className="comment-content">
                  <p className="comment-user">
                    {comment.name}{" "}
                    <span className="comment-time">· {comment.time}</span>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
