import React from 'react';
import './MainPage.css';
import video from '../../assets/background.mp4'
const MainPage = () => {
  return (
    <div className="main-page">
      <div className="video-background">
        <video autoPlay muted loop id="backgroundVideo">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content">
        <header>
          <div className="logo">Your Logo</div>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#cases">Cases</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </nav>
        </header>
        <div className="hero-section">
          <h1>Manage Your Investments Easily and Effectively</h1>
          <p>20 years in Stock Market</p>
          <div className="cta-buttons">
            <button onClick={() => window.location.href='/login'}>Log In</button>
            <button onClick={() => window.location.href='/signup'}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
