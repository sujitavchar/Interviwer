import React from "react";
import { FaImage, FaLink, FaMapMarkerAlt, FaSmile } from "react-icons/fa";
import "../styles/postcard.css"; 
import profileIcon from "../assets/profile_image_icon.png";


const PostInputBox = () => {
  return (
    <div className="post-box">
      {/* Profile Picture */}
      <img
        src={profileIcon}
        alt="Profile"
        className="profile-pic"
      />

      {/* Input Box and Options */}
      <div className="input-section">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="post-input"
        />

        {/* Icons for Attachments */}
        <div className="icon-container">
          <FaImage className="icon" />
          <FaLink className="icon" />
          <FaMapMarkerAlt className="icon" />
          <FaSmile className="icon" />
        </div>
      </div>

      {/* Post Button */}
      <button className="post-button">Post</button>
    </div>
  );
};

export default PostInputBox;
