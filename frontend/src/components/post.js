import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare, FaTrash } from "react-icons/fa";
import "../styles/post.css";

const Post = ({ user, time, title, text, image, likes, comments, shares }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Sample comments (replace with DB fetched comments)
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
        isOwner: true, // Marks the comment as owned by the user
      };

      setCommentList([newComment, ...commentList]); // Add new comment at the top
      setCommentText(""); // Clear input field
    }
  };

  const handleDeleteComment = (id) => {
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };

  return (
    <div className={`post-container ${isExpanded ? "expanded" : ""}`}>
      {/* Header Section */}
      <div className="post-header">
        <img src={user.profilePic} alt="User" className="profile-pic" />
        <div className="post-info">
          <p className="user-name">{user.name}</p>
          <p className="post-time">{time} ago</p>
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
        <button className={`action-btn ${isLiked ? "liked" : ""}`} onClick={handleLikeToggle}>
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
                <img src={comment.profilePic} alt="User" className="comment-profile-pic" />
                <div className="comment-content">
                  <p className="comment-user">
                    {comment.name} <span className="comment-time">· {comment.time}</span>
                  </p>
                  <p className="comment-text">{comment.text}</p>
                </div>
                {/* Show delete button only if user owns the comment */}
                {comment.isOwner && (
                  <button className="delete-btn" onClick={() => handleDeleteComment(comment.id)}>
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
