import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronLeft,
  FaHome,
  FaUser,
  FaEnvelope,
  FaUsers,
  FaNewspaper,
  FaBookOpen,
  FaTicketAlt,
  FaClock,
} from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768); // Sidebar always open on large screens
    };

    const handleClickOutside = (event) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen]);

  return (
    <>
      {isMobile && (
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      )}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <ul className="menu">
          <li>
            <Link to="/">
              <FaHome className="icon" /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FaUser className="icon" /> <span>Profile</span>
            </Link>
          </li>
          <h3>Favorites</h3>
          <li>
            <Link to="/messages">
              <FaEnvelope className="icon" /> <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link to="/friends">
              <FaUsers className="icon" /> <span>Friends</span>
            </Link>
          </li>
          <li>
            <Link to="/feed">
              <FaNewspaper className="icon" /> <span>Feed</span>
            </Link>
          </li>
          <li>
            <Link to="/stories">
              <FaBookOpen className="icon" /> <span>Stories</span>
            </Link>
          </li>
          <li>
            <Link to="/events">
              <FaTicketAlt className="icon" /> <span>Events</span>
            </Link>
          </li>
          <li>
            <Link to="/memories">
              <FaClock className="icon" /> <span>Memories</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
