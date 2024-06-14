import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us" id="about">
      <div className="container">
        <h2>About Us</h2>
        <p className="intro">
          Welcome to Trading Bros, your trusted partner in navigating the stock market. With over 20 years of experience, we have been at the forefront of financial innovation, providing our clients with the tools and knowledge they need to succeed.
        </p>
        <div className="history">
          <h3>Our History</h3>
          <p>
            Trading Bros was founded in 2000 with the mission of making stock trading accessible to everyone. Over the years, we have grown from a small startup to a leading firm in the financial industry. Our commitment to excellence and innovation has driven our success, and we continue to strive for the highest standards in everything we do.
          </p>
        </div>
        <div className="mission-vision">
          <h3>Our Mission & Vision</h3>
          <p>
            Our mission is to empower investors of all levels with the resources and support needed to make informed trading decisions. We envision a world where financial success is achievable for everyone, and we are dedicated to providing the education and tools necessary to make that vision a reality.
          </p>
        </div>
        <div className="team">
          <h3>Meet the Team</h3>
          <div className="team-members">
            <div className="team-member">
              <img src="" alt="CEO" />
              <h4>John Doe</h4>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="" alt="CFO" />
              <h4>Jane Smith</h4>
              <p>CFO</p>
            </div>
            <div className="team-member">
              <img src="" alt="CTO" />
              <h4>Robert Johnson</h4>
              <p>CTO</p>
            </div>

          </div>
        </div>
        <div className="values">
          <h3>Our Values</h3>
          <ul>
            <li>Integrity: We conduct our business with the highest ethical standards.</li>
            <li>Innovation: We embrace change and strive to lead with innovative solutions.</li>
            <li>Client Focus: Our clients' success is our top priority.</li>
            <li>Excellence: We aim for excellence in every aspect of our work.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
