import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import LandingPage from "./pages/LandingPage/landingpage"
import Register from "./pages/Register/register"
import "./styles/index.css"; 

const App = () => {
  return (
    <BrowserRouter>

      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;


