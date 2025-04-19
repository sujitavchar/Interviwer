import React from 'react';
import './landingpage.css';
import logo from "../../assets/logo.png"
import Heroimage from "../../assets/hero_image.jpg"
  
const NetwrkLanding = () => {
  return (
    <div className="netwrk-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="NETWRK Logo" className="logo" />
        </div>
        <div className="nav-links">
          
        </div>
        <div className="auth-buttons">
          <button className="login-btn"><a href="/login">Login </a></button>
          <button className="register-btn"><a href="/register">Register</a></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Ignite Your Professional Journey with NETWRK</h1>
          <p>Build lasting connections, uncover new opportunities, and elevate your career with NETWRK – where professionals thrive.</p>
          <div className="hero-cta">
            <button className="primary-btn"><a href="/register">Start your journey</a></button>
            <button className="secondary-btn"><a href="/login">Already registered? Then login here ..</a></button>
          </div>
        </div>
        <div className="hero-image">
          <img src={Heroimage} alt="Professionals networking" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Unlock Powerful Features to Propel Your Career</h2>
        <div className="feature-cards">
          <div className="feature-card">
            
            <h3>AI-Powered "Rewrite with AI" Button</h3>
            <p>With our innovative "Rewrite with AI" button, users can effortlessly craft professional posts, just like those on LinkedIn. Whether you're looking to improve your writing or generate fresh ideas, our AI tool provides the perfect assist in refining your content to make it stand out.</p>
          </div>
          <div className="feature-card">
            
            <h3>AI Chatbot for Seamless Customer Assistance</h3>
            <p>Our AI chatbot is designed to revolutionize how you interact with your audience. Not only does it efficiently handle customer queries, but it can also generate creative content, offer fresh ideas, and even write entire posts. It's your 24/7 virtual assistant, always ready to provide exceptional support and enhance your content creation experience.</p>
          </div>
          <div className="feature-card">
            
            <h3>Upskill with Purpose</h3>
            <p>Access personalized learning paths and resources designed to help you grow and stand out in your field.</p>
          </div>
          <div className="feature-card">
           
            <h3>Actionable Insights</h3>
            <p>Track your networking success and gain valuable insights to continuously improve your strategy.</p>
          </div>
        </div>
      </section>

   


      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="NETWRK Logo" />
            <p>Connect. Collaborate. Conquer.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <a href="/">Features</a>
              <a href="/">Pricing</a>
              <a href="/">Enterprise</a>
              <a href="/">Security</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="/">Blog</a>
              <a href="/">Guides</a>
              <a href="/">Events</a>
              <a href="/">Webinars</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/">About Us</a>
              <a href="/">Careers</a>
              <a href="/">Press</a>
              <a href="/">Contact</a>
            </div>
            <div className="footer-column">
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
