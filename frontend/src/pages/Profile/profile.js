import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import PostCard from "../../components/postcard";
import { FaEdit } from "react-icons/fa";
import "./profile_page.css";
import profileIcon from "../../assets/profile_image_icon.png";
import Banner from "../../assets/banner.jpg";
import { useUser } from "../../context/usercontext";
import axios from "axios";
import UserPostsCarousel from "../../components/post_carousel";

const FullPageLoader = () => (
  <div className="fullpage-loader">
    <div className="spinner"></div>
  </div>
);

const ProfilePage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(
          `https://interviwer-production.up.railway.app/api/v1/users/profile/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const profileData = res.data?.data;
        if (profileData) {
          setUserData(profileData);
          setFollowersCount(profileData.followersCount || 0);
          setIsFollowing(profileData.isFollowed || false);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          "https://interviwer-production.up.railway.app/api/v1/users/posts",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserPosts(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [user]);

  const handleFollow = async () => {
    if (!userData?._id || followLoading) return;
    setFollowLoading(true);
    try {
      await axios.post(
        "https://interviwer-production.up.railway.app/api/v1/follows/follow",
        {
          userIdToFollow: userData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const newFollowState = !isFollowing;
      setIsFollowing(newFollowState);
      setFollowersCount((prev) => prev + (newFollowState ? 1 : -1));
    } catch (error) {
      console.error("Error toggling follow state:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return <FullPageLoader />;

  const profile = {
    fullName: userData?.fullName || "No Name",
    userName: userData?.userName || "unknown",
    profileImg: userData?.profileImg || profileIcon,
    banner: Banner,
    collegeName: userData?.collegeName,
    companyName: userData?.companyName,
    email: userData?.email,
    mobileNo: userData?.mobileNo,
    friends: followersCount,
  };

  return (
    <div className="profile-page-container">
      <Navbar username={profile.fullName} profileImage={profile.profileImg} />

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
            <p className="profile-friends">
              {followersCount} follower{followersCount !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="profile-actions">
            <button
              className="follow-button"
              onClick={handleFollow}
              disabled={followLoading}
            >
              {followLoading
                ? "Processing..."
                : isFollowing
                  ? "Unfollow"
                  : "Follow"}{" "}
              👥
            </button>

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
            {profile.collegeName && (
              <div className="detail-item">
                <span className="detail-label">🎓 Graduated From :</span>
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
          <div className="post-creation-box">
            <PostCard />
          </div>

          <div className="posts-container">
            {userPosts.length > 0 ? (
              <>
                <h3 className="carousel-section-heading"> Recent Posts</h3>
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

      <div className="logout-button-wrapper">
        <button
          className="logout-button"
          onClick={async () => {
            try {
              await axios.post(
                "https://interviwer-production.up.railway.app/api/v1/users/logout",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );
              localStorage.clear();
              window.location.href = "/login";
            } catch (err) {
              console.error("Logout failed:", err);
            }
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
