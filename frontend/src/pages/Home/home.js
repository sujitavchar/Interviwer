import React from 'react';
import './home.css'; 
import Sidebar from '../../components/sidebar';
import Postcard from '../../components/postcard';
import Post from '../../components/post';
import Latestevents from '../../components/latestevents';

import profileIcon from "../../assets/profile_image_icon.png";
import temp from '../../assets/temp.png';

const HomePage = () => {
  return (
    <div className="home-container">
        <Sidebar/>
        
        {/* Main Content */}
        <div className="main-content">
            <div className="feed">
                <Postcard/>
                <Post
                    user={{ name: "Robert Hammond", profilePic: profileIcon }}
                    time="20 min"
                    title= "Temporary title"
                    text="My wife prepared a surprise trip for me. Here are some shots from Sri Lanka. ❤️ lkdnlk aghh a ashgalsh kaslhag askdh ahg asl'fkh aslkfhg a l'kshfhg 'akslfhg 'aslkgh  'ksadhfhg asklgh a'slkg ha s'dfgh a'sfgh  as' hasd g'ashdg 'asdkhg 'adsgh 'adslgh asklg hsa'gk has asd a;osdh odshgoahsd poidshgd oaisdhg ;h as;dgh a;sdgi h as;dgh a;sdgih as;dlgih as;digh a;sdighdshhg;kdashg;ldshgadshg;ashdg"
                    image={temp}
                    likes={230}
                    comments={6}
                    shares={2}
                />
            </div>

            {/* Right Sidebar */}
            <div className="right-sidebar">
                <Latestevents/>
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
