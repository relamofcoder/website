import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO, TechStart Inc.',
    company: 'TechStart Inc.',
    feedback: 'Realm of Coder transformed our digital presence completely. Their innovative approach and attention to detail exceeded all our expectations. The team delivered a stunning website that increased our conversions by 300%.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=50&fit=crop',
    project: 'E-commerce Platform',
    duration: '3 months'
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    position: 'Founder, Digital Solutions',
    company: 'Digital Solutions',
    feedback: 'Outstanding work! The team at Realm of Coder created a mobile app that perfectly captures our vision. Professional, timely, and incredibly talented developers.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=50&fit=crop',
    project: 'Mobile Application',
    duration: '4 months'
  },
  {
    id: 3,
    name: 'Emily Chen',
    position: 'Marketing Director, InnovateCorp',
    company: 'InnovateCorp',
    feedback: 'The AI-powered dashboard they built for us is simply amazing. It has revolutionized how we analyze our data and make business decisions. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=50&fit=crop',
    project: 'AI Dashboard',
    duration: '6 months'
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    position: 'CTO, CloudTech',
    company: 'CloudTech',
    feedback: 'Exceptional cloud infrastructure setup and DevOps implementation. Our deployment time reduced from hours to minutes. The team is incredibly knowledgeable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=50&fit=crop',
    project: 'Cloud Infrastructure',
    duration: '2 months'
  },
  {
    id: 5,
    name: 'Fatima Al-Zahra',
    position: 'Product Manager, HealthTech',
    company: 'HealthTech Solutions',
    feedback: 'The healthcare management system they developed is user-friendly and secure. It has streamlined our operations and improved patient satisfaction significantly.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=50&fit=crop',
    project: 'Healthcare Platform',
    duration: '5 months'
  },
  {
    id: 6,
    name: 'David Thompson',
    position: 'Founder, EcoGreen',
    company: 'EcoGreen Initiative',
    feedback: 'Beautiful UI/UX design that perfectly represents our brand values. The website is not only visually stunning but also highly functional and fast.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=50&fit=crop',
    project: 'Brand Website',
    duration: '2 months'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef, { once: true });

  useEffect(() => {
    if (isInView) {
      gsap.fromTo('.testimonial-card',
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }
  }, [isInView]);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  return (
    <section className="testimonials" id="testimonials" ref={testimonialsRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="testimonials__header"
        >
          <h2 className="testimonials__title">Client Success Stories</h2>
          <p className="testimonials__subtitle">Hear from our satisfied clients about their transformative experiences</p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="testimonials__carousel">
          <div
            className="carousel-container"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="featured-testimonial"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonials[currentIndex].feedback}</p>
                  <div className="testimonial-rating">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                </div>

                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
                    <div className="image-glow"></div>
                  </div>
                  <div className="author-info">
                    <h4>{testimonials[currentIndex].name}</h4>
                    <p>{testimonials[currentIndex].position}</p>
                    <div className="company-info">
                      <img src={testimonials[currentIndex].companyLogo} alt={testimonials[currentIndex].company} />
                      <span>{testimonials[currentIndex].company}</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-detail">
                      <span className="label">Project:</span>
                      <span className="value">{testimonials[currentIndex].project}</span>
                    </div>
                    <div className="project-detail">
                      <span className="label">Duration:</span>
                      <span className="value">{testimonials[currentIndex].duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button className="carousel-btn prev" onClick={prevTestimonial}>
              ‹
            </button>
            <button className="carousel-btn next" onClick={nextTestimonial}>
              ›
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          className="testimonials__grid"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {testimonials.slice(0, 3).map((testimonial, idx) => (
            <motion.div
              className="testimonial-card"
              key={testimonial.id}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setCurrentIndex(idx)}
            >
              <div className="card-header">
                <div className="client-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="client-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.position}</p>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="testimonial-excerpt">
                "{testimonial.feedback.substring(0, 120)}..."
              </p>
              <div className="card-footer">
                <img src={testimonial.companyLogo} alt={testimonial.company} className="company-logo" />
                <span className="project-type">{testimonial.project}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
