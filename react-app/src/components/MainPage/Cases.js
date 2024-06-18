import React from 'react';
import './Cases.css';

const Cases = () => {
  return (
    <section className="cases" id="cases">
      <div className="container">
        <h2>Case Studies</h2>
        <p className="intro">
          Discover how Trading Bros has helped clients achieve their financial goals through innovative solutions and dedicated support. Here are some of our success stories.
        </p>
        <div className="case-studies">
          <div className="case-study">
            <img src="/path/to/case1-image.jpg" alt="Case Study 1" />
            <h3>Client A: Transforming Investment Strategies</h3>
            <p>
              Client A was struggling with outdated investment strategies that yielded minimal returns. We provided a comprehensive analysis and developed a modern strategy that increased their portfolio performance by 40% within six months.
            </p>
          </div>
          <div className="case-study">
            <img src="/path/to/case2-image.jpg" alt="Case Study 2" />
            <h3>Client B: Maximizing Returns with AI</h3>
            <p>
              Using our advanced AI algorithms, Client B was able to optimize their trades and achieve a 30% increase in returns while minimizing risks. Our tailored approach ensured continuous growth and stability.
            </p>
          </div>
          <div className="case-study">
            <img src="/path/to/case3-image.jpg" alt="Case Study 3" />
            <h3>Client C: Navigating Market Volatility</h3>
            <p>
              During a period of market volatility, we assisted Client C in managing their investments effectively, protecting their assets and capitalizing on new opportunities. Our strategies resulted in a 25% portfolio growth despite market fluctuations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cases;
