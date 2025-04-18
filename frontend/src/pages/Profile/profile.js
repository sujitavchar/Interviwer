import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import PostCard from "../../components/postcard";
// import Posts from "../../components/Posts"; // Uncomment when ready
import { FaEdit } from "react-icons/fa";
import "./profile_page.css";
import profileIcon from "../../assets/profile_image_icon.png";
import Banner from "../../assets/banner.jpg";
import { useUser } from "../../context/usercontext";

const ProfilePage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const ContentLoader = ({ height, width = "100%" }) => (
    <div className="content-loader" style={{ height, width }}></div>
  );

  const userData = {
    fullName: user?.name || "No Name",
    profileImg: user?.profileImg || profileIcon,
    banner: user?.banner || Banner,
    collegeName: user?.collegeName,
    companyName: user?.companyName,
    email: user?.email,
    mobileNo: user?.mobileNo,
    friends: user?.friends || 0,
    myPosts: user?.myPosts || [],
  };

  return (
    <div className="profile-page-container">
      <Navbar />

      <div className="profile-banner" style={{ backgroundImage: `url(${userData.banner})` }}>
        {loading && <div className="banner-loader"></div>}
      </div>

      <div className="profile-info-wrapper">
        <div className="profile-info-container">
          <div className="profile-photo-container">
            {loading ? (
              <div className="profile-photo-loader"></div>
            ) : (
              <img src={userData.profileImg} alt="Profile" className="profile-photo" />
            )}
          </div>

          <div className="profile-user-info">
            {loading ? (
              <>
                <ContentLoader height="30px" width="150px" />
                <ContentLoader height="20px" width="100px" />
              </>
            ) : (
              <>
                <h1 className="profile-username">{userData.fullName}</h1>
                <p className="profile-friends">{userData.friends} friends</p>
              </>
            )}
          </div>

          <div className="profile-actions">
            <button className="follow-button">Follow 👥</button>
            <button className="message-button">Message 💬</button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="basic-info-section">
            <h3 className="section-title">Basic info</h3>
            <div className="info-buttons-container">
              <button className="info-button">
                <FaEdit className="button-icon" /> Edit details
              </button>
            </div>
          </div>

          <div className="user-details-section">
            {loading ? (
              <>
                <ContentLoader height="20px" />
                <ContentLoader height="20px" />
              </>
            ) : (
              <>
                {userData.collegeName && (
                  <div className="detail-item">
                    <span className="detail-label">College:</span>
                    <span className="detail-value">{userData.collegeName}</span>
                  </div>
                )}
                {userData.companyName && (
                  <div className="detail-item">
                    <span className="detail-label">Works at:</span>
                    <span className="detail-value">{userData.companyName}</span>
                  </div>
                )}
                {userData.email && (
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{userData.email}</span>
                  </div>
                )}
                {userData.mobileNo && (
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{userData.mobileNo}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="profile-main-content">
          <div className="post-creation-box">
            <PostCard />
          </div>

          <div className="posts-container">
            {loading ? (
              <div className="posts-loader-container">
                <ContentLoader height="100px" />
                <ContentLoader height="150px" />
              </div>
            ) : userData.myPosts.length > 0 ? (
              <div>{/* <Posts posts={userData.myPosts} /> */}</div>
            ) : (
              <div className="posts-empty-state">
                <p className="posts-message">No posts to display yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
