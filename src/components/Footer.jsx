import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Web Development', href: '#services' },
        { name: 'Mobile Apps', href: '#services' },
        { name: 'AI & ML', href: '#services' },
        { name: 'Cloud Solutions', href: '#services' },
        { name: 'UI/UX Design', href: '#services' },
        { name: 'Cybersecurity', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#team' },
        { name: 'Careers', href: '#careers' },
        { name: 'Blog', href: '#blog' },
        { name: 'Case Studies', href: '#portfolio' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'API Reference', href: '#api' },
        { name: 'Support Center', href: '#support' },
        { name: 'Community', href: '#community' },
        { name: 'Downloads', href: '#downloads' },
        { name: 'Tutorials', href: '#tutorials' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' },
        { name: 'GDPR', href: '#gdpr' },
        { name: 'Accessibility', href: '#accessibility' },
        { name: 'Licenses', href: '#licenses' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '📷', href: 'https://www.instagram.com/relamofcoder/', color: '#e4405f' },
    { name: 'GitHub', icon: '🐙', href: 'https://github.com/relamofcoder', color: '#333' }
  ];

  const achievements = [
    { number: '150+', label: 'Projects Delivered' },
    { number: '50+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer__main">
          {/* Company Info */}
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="brand__logo">
              <div className="logo-icon">RC</div>
              <h3>Realm of Coder</h3>
            </div>
            <p className="brand__description">
              Transforming ideas into digital reality with cutting-edge technology and innovative solutions.
              Your trusted partner for web development, mobile apps, and AI-powered solutions based in Pakistan.
            </p>

            {/* Achievements */}
            <div className="footer__achievements">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement">
                  <span className="achievement-number">{achievement.number}</span>
                  <span className="achievement-label">{achievement.label}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="footer__social">
              <h4>Follow Us</h4>
              <div className="social__links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="social__link"
                    style={{ '--social-color': social.color }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-tooltip">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="footer__links">
            {footerSections.map((section, index) => (
              <motion.div
                key={index}
                className="footer__section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="footer__newsletter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="newsletter__content">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates, tech insights, and exclusive offers.</p>
          </div>
          <div className="newsletter__form">
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; {currentYear} Realm of Coder. All rights reserved.</p>
            <p>Made with ❤️ using React, Framer Motion & GSAP</p>
          </div>

          <div className="footer__certifications">
            <div className="cert-badge">ISO 27001</div>
            <div className="cert-badge">GDPR Compliant</div>
            <div className="cert-badge">SOC 2 Type II</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
