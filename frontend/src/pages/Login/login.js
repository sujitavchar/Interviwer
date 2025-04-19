import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/usercontext";
import "./login.css";
import logo from "../../assets/logo.png"

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://interviwer-production.up.railway.app/api/v1/users/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      const userData = res.data.data.user;
      const token = res.data.data.accessToken;

      setUser({
        name: userData.fullName,
        profileImg: userData.profileImg,
        email: userData.email,
        id: userData._id,
        token: token,
      });

      setMessage("✅ Login successful!");
      navigate("/home");
    } catch (err) {
      setMessage("❌ Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
   
      <div className="interviewr-login-wrapper">
        <div className="interviewr-login-container">
              <img
              src={logo}
              alt="Interviewr Logo"
              className="interviewr-login-logo"
            />
          <h2 className="interviewr-login-title">Welcome Back 👋</h2>
          <form onSubmit={handleSubmit} className="interviewr-login-form">
            <div>
              <label htmlFor="email" className="interviewr-login-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="interviewr-login-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="interviewr-login-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="interviewr-login-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="interviewr-login-button"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && <div className="interviewr-login-message">{message}</div>}
        </div>
      </div>
    
  );
};

export default LoginPage;
