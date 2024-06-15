import React from 'react';
import './MainPage.css';
import video from '../../assets/background.mp4';
import logo from '../../assets/logo2.png';


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
        <div className="hero-section">
          <img src={logo} alt="Trading Bros" className="main-logo" />
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
