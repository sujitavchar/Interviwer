import React from 'react';
import './home.css'; 
import Sidebar from '../../components/sidebar';
import Postcard from '../../components/postcard'

const HomePage = () => {
  return (
    <div className="app-container">
        <Sidebar/>
        <Postcard/>
    </div>
  );
};

export default HomePage;