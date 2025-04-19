import React from 'react';
import './landingpage.css';
import logo from "../../assets/logo.png";
import Heroimage from "../../assets/hero_image.jpg";

const NetwrkLanding = () => {
  return (
    <div className="netwrk-landing-container">
      {/* Navigation Bar */}
      <nav className="netwrk-navbar">
        <div className="netwrk-logo-container">
          <img src={logo} alt="NETWRK Logo" className="netwrk-logo" />
        </div>
        <div className="netwrk-nav-links"></div>
        <div className="netwrk-auth-buttons">
          <button className="netwrk-login-btn"><a href="/login">Login</a></button>
          <button className="netwrk-register-btn"><a href="/register">Register</a></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="netwrk-hero-section">
        <div className="netwrk-hero-content">
          <h1>Ignite Your Professional Journey with NETWRK</h1>
          <p>Build lasting connections, uncover new opportunities, and elevate your career with NETWRK – where professionals thrive.</p>
          <div className="netwrk-hero-cta">
            <button className="netwrk-primary-btn"><a href="/register">Start your journey</a></button>
            <button className="netwrk-secondary-btn"><a href="/login">Already registered? Then login here ..</a></button>
          </div>
        </div>
        <div className="netwrk-hero-image">
          <img src={Heroimage} alt="Professionals networking" />
        </div>
      </section>

      {/* Features Section */}
      <section className="netwrk-features-section">
        <h2>Unlock Powerful Features to Propel Your Career</h2>
        <div className="netwrk-feature-cards">
          <div className="netwrk-feature-card">
            <h3>AI-Powered "Rewrite with AI" Button</h3>
            <p>With our innovative button, users can effortlessly craft professional posts just like on LinkedIn. Improve writing or generate fresh ideas with ease.</p>
          </div>
          <div className="netwrk-feature-card">
            <h3>AI Chatbot for Seamless Customer Assistance</h3>
            <p>Our chatbot handles queries, generates content, and acts as your 24/7 virtual assistant to support and enhance communication.</p>
          </div>
          <div className="netwrk-feature-card">
            <h3>Upskill with Purpose</h3>
            <p>Access personalized learning paths and resources designed to help you grow and stand out in your field.</p>
          </div>
          <div className="netwrk-feature-card">
            <h3>Actionable Insights</h3>
            <p>Track your networking success and gain valuable insights to continuously improve your strategy.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="netwrk-footer">
        <div className="netwrk-footer-content">
          <div className="netwrk-footer-logo">
            <img src={logo} alt="NETWRK Logo" />
            <p>Connect. Collaborate. Conquer.</p>
          </div>
          <div className="netwrk-footer-links">
            <div className="netwrk-footer-column">
              <h4>Platform</h4>
              <a href="/">Features</a>
              <a href="/">Pricing</a>
              <a href="/">Enterprise</a>
              <a href="/">Security</a>
            </div>
            <div className="netwrk-footer-column">
              <h4>Resources</h4>
              <a href="/">Blog</a>
              <a href="/">Guides</a>
              <a href="/">Events</a>
              <a href="/">Webinars</a>
            </div>
            <div className="netwrk-footer-column">
              <h4>Company</h4>
              <a href="/">About Us</a>
              <a href="/">Careers</a>
              <a href="/">Press</a>
              <a href="/">Contact</a>
            </div>
            <div className="netwrk-footer-column">
              <h4>Legal</h4>
              <a href="/">Terms</a>
              <a href="/">Privacy</a>
              <a href="/">Cookies</a>
              <a href="/">Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NetwrkLanding;
