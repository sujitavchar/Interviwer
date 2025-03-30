import React, { useState } from "react";
import "../styles/postcard.css";
import profileIcon from "../assets/profile_image_icon.png";
import CreatePost from "../components/createpost";

const PostInputBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Post Input Box */}
      <div className="post-box">
        {/* Profile Picture */}
        <img src={profileIcon} alt="Profile" className="profile-pic" />

        {/* Input Section (Click to Open Modal) */}
        <div className="input-section" onClick={() => setIsModalOpen(true)}>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="post-input"
            readOnly
          />
        </div>

        {/* Post Button */}
        <button className="post-button">Post</button>
      </div>

      {/* CreatePost Modal */}
      {isModalOpen && <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default PostInputBox;
