import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar";

import "./profile_page.css";
import profileIcon from "../../assets/profile_image_icon.png";
import Banner from "../../assets/banner.jpg";
import { useUser } from "../../context/usercontext";
import UserPostsCarousel from "../../components/post_carousel";

const FullPageLoader = () => (
  <div className="fullpage-loader">
    <div className="spinner"></div>
  </div>
);

const PublicProfilePage = () => {
    const { userId: profileUserId } = useParams();

  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileUserId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        // Adding withCredentials to maintain session cookies
        const res = await axios.get(
          `https://interviwer-production.up.railway.app/api/v1/users/profile/${profileUserId}`,
          { withCredentials: true }
        );
        
        if (res.data?.data) {
          const profileData = res.data.data;
          setUserData(profileData);
          setFollowersCount(profileData.followersCount || 0);
          setIsFollowing(profileData.isFollowed || false);
        } else {
          setError("Could not load user profile data");
          console.error("No profile data returned:", res.data);
        }
      } catch (error) {
        setError("Error loading profile");
        console.error("Error fetching profile:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      if (!profileUserId) return;
      
      try {
        // Adding withCredentials to maintain session cookies
        const res = await axios.get(
          `https://interviwer-production.up.railway.app/api/v1/content/userposts/${profileUserId}`,
          { withCredentials: true }
        );
        
        if (res.data?.data) {
          setUserPosts(res.data.data);
        } else {
          console.error("No posts data returned:", res.data);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error.response || error);
      }
    };

    setLoading(true);
    fetchProfile();
    fetchPosts();
  }, [profileUserId]);

  const handleFollow = async () => {
    if (!profileUserId || followLoading) return;

    setFollowLoading(true);
    try {
      await axios.post(
        "https://interviwer-production.up.railway.app/api/v1/follows/follow",
        { userIdToFollow: profileUserId },
        { withCredentials: true }
      );
      
      setIsFollowing((prev) => !prev);
      setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error in follow/unfollow:", error.response || error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return <FullPageLoader />;
  
  if (error) {
    return (
      <div className="profile-page-container">
        <Navbar />
        <div className="error-container">
          <h2>Error loading profile</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-page-container">
        <Navbar />
        <div className="error-container">
          <h2>User not found</h2>
          <p>The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  const profile = {
    fullName: userData.fullName || "No Name",
    userName: userData.userName || "unknown",
    profileImg: userData.profileImg || profileIcon,
    banner: Banner,
    collegeName: userData.collegeName,
    companyName: userData.companyName,
    email: userData.email,
    mobileNo: userData.mobileNo,
    friends: followersCount,
  };

  return (
    <div className="profile-page-container">
      <Navbar username={user?.fullName} profileImage={user?.profileImg} />

      <div
        className="profile-banner"
        style={{ backgroundImage: `url(${profile.banner})` }}
      />

      <div className="profile-info-wrapper">
        <div className="profile-info-container">
          <div className="profile-photo-container">
            <img
              src={profile.profileImg}
              alt="Profile"
              className="profile-photo"
            />
          </div>

          <div className="profile-user-info">
            <h1 className="profile-username">{profile.fullName}</h1>
            <p className="profile-friends">{profile.friends} followers</p>
          </div>

          <div className="profile-actions">
            {user && user._id !== profileUserId && (
              <>
                <button className="follow-button" onClick={handleFollow} disabled={followLoading}>
                  {followLoading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"} 👥
                </button>
                <button className="message-button">Message 💬</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="basic-info-section">
            <h3 className="section-title">Basic info</h3>
          </div>

          <div className="user-details-section">
            {profile.collegeName && (
              <div className="detail-item">
                <span className="detail-label">🎓 Graduated From:</span>
                <span className="detail-value">{profile.collegeName}</span>
              </div>
            )}
            {profile.companyName && (
              <div className="detail-item">
                <span className="detail-label">🏢 Works at:</span>
                <span className="detail-value">{profile.companyName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="profile-main-content">
          <div className="posts-container">
            {userPosts.length > 0 ? (
              <>
                <h3 className="carousel-section-heading">Recent Posts</h3>
                <UserPostsCarousel posts={userPosts} />
              </>
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

export default PublicProfilePage;