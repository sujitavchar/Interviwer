import React, { useState } from "react";
import "../styles/navbar.css";
import profileIcon from "../assets/profile_image_icon.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left section - Brand name */}
      <div className="navbar-brand">
        <a href="/" className="brand-link">Connected</a>
      </div>

      {/* Mobile menu button */}
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
        <div className={`hamburger ${menuOpen ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Navigation container - wraps search and actions */}
      <div className={`navbar-container ${menuOpen ? "active" : ""}`}>
        {/* Search bar - Visible inside the menu on small screens */}
        <div className="navbar-search">
          <div className="search-container">
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>

        {/* Right section - Icons and profile */}
        <div className="navbar-actions">
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button className="action-button">
            <span className="notification-count">0</span>
          </button>
          <div className="user-profile">
            <span className="username">Ben Goro</span>
            <a href="/profile" className="avatar-link">
              <img src={profileIcon} alt="User avatar" className="avatar-image" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
