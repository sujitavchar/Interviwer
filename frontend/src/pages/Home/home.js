import React, { useEffect, useState } from "react";
import "./home.css";
import Sidebar from "../../components/sidebar";
import Postcard from "../../components/postcard";
import Post from "../../components/post";
import Latestevents from "../../components/latestevents";
import Navbar from "../../components/navbar";

import profileIcon from "../../assets/profile_image_icon.png";

import { useUser } from "../../context/usercontext";
import axios from "axios";

const HomePage = () => {
  const { user } = useUser();

  const userName = user?.name || "Guest";
  const profileImageLink = user?.profileImg || profileIcon;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://interviwer-production.up.railway.app/api/v1/content/feed", {
          withCredentials: true
        });
        
          
          
          
        console.log(response)
        if (response.status === 200) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <Navbar username={userName} profileImage={profileImageLink} />
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="feed">
          <Postcard />

          {/* Dynamically Render Fetched Posts */}
          {posts.map((item) => (
            <Post
              key={item._id}
              user={{
                name: item.owner.fullName,
                profilePic: item.owner.profileImg  || profileIcon, // default for now
              }}
              time={new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              title={item.title}
              text={item.text}
              image={item.image || ""}
              likes={Math.floor(Math.random() * 300)} // mocked for demo
              comments={Math.floor(Math.random() * 10)}
              shares={Math.floor(Math.random() * 5)}
            />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <Latestevents />
        </div>

        {/* Google Ads Space */}
        <div className="google-ads">
          <p>Google Ads Here</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
