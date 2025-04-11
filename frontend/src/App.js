import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import LandingPage from "./pages/LandingPage/landingpage";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import { UserProvider } from "./context/usercontext";  
import "./styles/index.css";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider> 
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
