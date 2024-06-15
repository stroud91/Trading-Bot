import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    name: 'John Doe',
    feedback: 'This service is fantastic! It has changed my life for the better.',
    image: 'path/to/john-image.jpg'
  },
  {
    name: 'Jane Smith',
    feedback: 'Highly professional and reliable. I would recommend it to anyone.',
    image: 'path/to/jane-image.jpg'
  },
  {
    name: 'Sam Wilson',
    feedback: 'Great customer support and excellent results. Truly a game-changer.',
    image: 'path/to/sam-image.jpg'
  },
  {
    name: 'Emily Johnson',
    feedback: 'The team is incredibly knowledgeable and helpful. I am very satisfied with their service.',
    image: 'path/to/emily-image.jpg'
  },
  {
    name: 'Michael Brown',
    feedback: 'Their expertise and dedication are unmatched. Highly recommended!',
    image: 'path/to/michael-image.jpg'
  },
  {
    name: 'Sarah Davis',
    feedback: 'A wonderful experience from start to finish. Excellent customer service!',
    image: 'path/to/sarah-image.jpg'
  },
  {
    name: 'Chris Miller',
    feedback: 'The best decision I ever made. They really care about their clients.',
    image: 'path/to/chris-image.jpg'
  },
  {
    name: 'Jessica Lee',
    feedback: 'Professional, efficient, and friendly. I am beyond impressed with the service.',
    image: 'path/to/jessica-image.jpg'
  },
  {
    name: 'David Martinez',
    feedback: 'Top-notch service with fantastic results. Will definitely use again.',
    image: 'path/to/david-image.jpg'
  },
  {
    name: 'Laura Garcia',
    feedback: 'Exceptional service and attention to detail. They exceeded my expectations.',
    image: 'path/to/laura-image.jpg'
  },
  {
    name: 'James Anderson',
    feedback: 'The team provided outstanding support and delivered great results.',
    image: 'path/to/james-image.jpg'
  },
  {
    name: 'Anna Taylor',
    feedback: 'I felt valued and supported throughout the entire process. Excellent service!',
    image: 'path/to/anna-image.jpg'
  },
  {
    name: 'Mark Wilson',
    feedback: 'Highly professional team with great expertise. Very satisfied with the outcome.',
    image: 'path/to/mark-image.jpg'
  },
  {
    name: 'Nina Rodriguez',
    feedback: 'They went above and beyond to ensure I was happy with the service. Wonderful experience!',
    image: 'path/to/nina-image.jpg'
  },
  {
    name: 'Oliver Evans',
    feedback: 'Friendly, efficient, and effective. Couldn’t ask for more.',
    image: 'path/to/oliver-image.jpg'
  },
  {
    name: 'Sophia White',
    feedback: 'A seamless and pleasant experience. They are true professionals.',
    image: 'path/to/sophia-image.jpg'
  },
  {
    name: 'William Harris',
    feedback: 'Their service is second to none. I highly recommend them.',
    image: 'path/to/william-image.jpg'
  },
  {
    name: 'Isabella Martin',
    feedback: 'They truly understand their clients’ needs and deliver exceptional service.',
    image: 'path/to/isabella-image.jpg'
  },
  {
    name: 'Henry Clark',
    feedback: 'Outstanding service with great results. I am extremely satisfied.',
    image: 'path/to/henry-image.jpg'
  },
  {
    name: 'Ava Thompson',
    feedback: 'Professional, dedicated, and reliable. A wonderful team to work with.',
    image: 'path/to/ava-image.jpg'
  },
  {
    name: 'Lucas Lee',
    feedback: 'They provided excellent guidance and support throughout. Highly recommend!',
    image: 'path/to/lucas-image.jpg'
  },
  {
    name: 'Grace Walker',
    feedback: 'Their commitment to customer satisfaction is commendable. Great experience!',
    image: 'path/to/grace-image.jpg'
  },
  {
    name: 'Daniel Robinson',
    feedback: 'The results exceeded my expectations. Truly exceptional service!',
    image: 'path/to/daniel-image.jpg'
  },
  {
    name: 'Mia Lewis',
    feedback: 'A fantastic team providing top-notch service. I couldn’t be happier.',
    image: 'path/to/mia-image.jpg'
  },
  {
    name: 'Liam Hall',
    feedback: 'They really listen to their clients and deliver exactly what is needed.',
    image: 'path/to/liam-image.jpg'
  }

];

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h1>What Our Clients Say</h1>
      <div className="testimonials-list">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <h3>{testimonial.name}</h3>
            <p>"{testimonial.feedback}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
