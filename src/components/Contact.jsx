import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true });

  const services = [
    'Web Development',
    'Mobile App Development',
    'AI & Machine Learning',
    'Cloud & DevOps',
    'UI/UX Design',
    'Cybersecurity',
    'Consultation',
    'Other'
  ];

  const budgetRanges = [
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Let\'s Discuss'
  ];

  const timelines = [
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ];

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'relamofcoder@gmail.com',
      link: 'mailto:relamofcoder@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+92 307 9317054',
      link: 'tel:+923079317054'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Pakistan',
      link: '#'
    },
    {
      icon: '🕒',
      title: 'Response Time',
      value: 'Within 24 hours',
      link: '#'
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: 'https://www.instagram.com/relamofcoder/' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/relamofcoder' }
  ];

  useEffect(() => {
    if (isInView) {
      gsap.fromTo('.contact-card',
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSubmitted(true);
    setIsSubmitting(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      budget: '',
      message: '',
      timeline: ''
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact" id="contact" ref={contactRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="contact__header"
        >
          <h2 className="contact__title">Let's Build Something Amazing Together</h2>
          <p className="contact__subtitle">
            Ready to transform your ideas into reality? Get in touch and let's discuss your next project.
          </p>
        </motion.div>

        <div className="contact__content">
          {/* Contact Information */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info__header">
              <h3>Get In Touch</h3>
              <p>We're here to help bring your vision to life. Reach out through any of these channels.</p>
            </div>

            <div className="contact__details">
              {contactInfo.map((info, index) => (
                <motion.a
                  href={info.link}
                  key={index}
                  className="contact-card info-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="card-icon">{info.icon}</div>
                  <div className="card-content">
                    <h4>{info.title}</h4>
                    <p>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="social__links">
              <h4>Follow Us</h4>
              <div className="social__grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="social__link"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="availability">
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>Available for new projects</span>
              </div>
              <p>Currently accepting projects for Q2 2024</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact__form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form__row">
                <div className="form__group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form__group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="form__group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form__group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="form__group">
                  <label>Service Needed *</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div className="form__group">
                  <label>Budget Range</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((budget, index) => (
                      <option key={index} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form__group">
                <label>Timeline</label>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                >
                  <option value="">Select timeline</option>
                  {timelines.map((timeline, index) => (
                    <option key={index} value={timeline}>{timeline}</option>
                  ))}
                </select>
              </div>

              <div className="form__group">
                <label>Project Details *</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                />
              </div>

              <motion.button
                type="submit"
                className="contact__btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </motion.button>

              {submitted && (
                <motion.div
                  className="contact__success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="success-icon">✅</div>
                  <div className="success-content">
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
