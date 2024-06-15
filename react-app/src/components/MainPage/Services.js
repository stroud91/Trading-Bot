import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2>Our Services</h2>
        <p className="intro">
          At Trading Bros, we offer a range of services to help you manage your investments effectively. Whether you're a beginner or an experienced trader, we have something for everyone.
        </p>
        <div className="service-list">
          <div className="service">
            <img src="/path/to/service1-image.jpg" alt="Service 1" />
            <h3>Portfolio Management</h3>
            <p>
              Our portfolio management services are designed to maximize your returns while minimizing risks. We provide personalized strategies tailored to your financial goals.
            </p>
          </div>
          <div className="service">
            <img src="/path/to/service2-image.jpg" alt="Service 2" />
            <h3>Market Analysis</h3>
            <p>
              Stay ahead of the market with our comprehensive market analysis. We offer insights and data-driven recommendations to help you make informed investment decisions.
            </p>
          </div>
          <div className="service">
            <img src="/path/to/service3-image.jpg" alt="Service 3" />
            <h3>Trading Education</h3>
            <p>
              Learn the fundamentals of trading with our educational resources. From basic concepts to advanced strategies, we provide the knowledge you need to succeed.
            </p>
          </div>
          <div className="service">
            <img src="/path/to/service4-image.jpg" alt="Service 4" />
            <h3>AI-Powered Trading</h3>
            <p>
              Harness the power of artificial intelligence with our AI-powered trading solutions. Our algorithms analyze market trends and execute trades to optimize your portfolio.
            </p>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Services;
