import React from 'react';
import './home.css'; 
import Sidebar from '../../components/sidebar';
import Postcard from '../../components/postcard';
import Post from '../../components/post';
import profileIcon from "../../assets/profile_image_icon.png";
import temp from '../../assets/temp.png'


const HomePage = () => {
  return (
    <div className="app-container">
        <Sidebar/>
        <Postcard/>
        <Post
            user={{ name: "Robert Hammond", profilePic: profileIcon }}
            time="20 min"
            title= "Temporary title"
            text="My wife prepared a surprise trip for me. Here are some shots from Sri Lanka. kjdsaufhasuhf sopsdg rg raaksjdh oihg asg sdpo h pioshg sadiog dsaiogh [dsaoigh ads[oigh dois h idshg ads[iogi hdsgioihs gpsh poi h iasdhg aso oishg [asiohg sa ghisoadhg [saoigh   haisdhg asdigh s dhaoshdg asghashgo asdoghashgshghasdgjkhaskjgkjshg sajghashgjh sagsdahghasgdhd asghas;kgh as;dlkh a;dsdlkh a;sdlk ;asddlkh ;sadlkh ;adslgkh ;dslgh ❤️"
            image={temp}
            likes={230}
            comments={6}
            shares={2}
        />

    </div>
  );
};

export default HomePage;