import React from "react";
import "./landingpage.css";
import { Link } from "react-router-dom";

function App() {
    return (
      <div className="container">
        <h1>Connected</h1>
        <p>Welcome! Join us and explore amazing features.</p>
        <Link to="/register">
          <button className="btn register">Register</button>
        </Link>
      </div>
    );
  }

export default App;
