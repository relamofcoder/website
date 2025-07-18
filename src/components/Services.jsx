import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import CountUp from 'react-countup';
import './Services.css';

const services = [
  {
    icon: '🚀',
    title: 'Full-Stack Development',
    desc: 'End-to-end web solutions using cutting-edge technologies like React, Node.js, and cloud platforms.',
    longDesc: 'Complete web application development from frontend to backend, including database design, API development, and deployment.',
    features: ['React/Vue.js', 'Node.js/Python', 'Database Design', 'Cloud Deployment'],
    progress: 95,
    projects: 45,
    color: '#38bdf8'
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile applications with native performance and modern UI/UX design.',
    longDesc: 'Native and cross-platform mobile app development for iOS and Android using React Native and Flutter.',
    features: ['React Native', 'Flutter', 'iOS/Android', 'App Store Deployment'],
    progress: 88,
    projects: 32,
    color: '#a21caf'
  },
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Intelligent automation solutions and AI-powered features to transform your business processes.',
    longDesc: 'Custom AI solutions including chatbots, recommendation systems, and predictive analytics using modern ML frameworks.',
    features: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    progress: 82,
    projects: 28,
    color: '#06b6d4'
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    desc: 'Scalable cloud infrastructure and automated deployment pipelines for optimal performance.',
    longDesc: 'Cloud architecture design, containerization, CI/CD pipelines, and infrastructure as code for scalable applications.',
    features: ['AWS/Azure', 'Docker', 'Kubernetes', 'CI/CD'],
    progress: 90,
    projects: 38,
    color: '#a855f7'
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces that provide exceptional user experiences and drive engagement.',
    longDesc: 'User-centered design approach with wireframing, prototyping, and usability testing for optimal user experience.',
    features: ['Figma/Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    progress: 93,
    projects: 52,
    color: '#f59e0b'
  },
  {
    icon: '🔒',
    title: 'Cybersecurity',
    desc: 'Comprehensive security solutions to protect your applications and data from modern threats.',
    longDesc: 'Security audits, penetration testing, secure coding practices, and compliance implementation.',
    features: ['Security Audits', 'Penetration Testing', 'GDPR Compliance', 'Encryption'],
    progress: 85,
    projects: 25,
    color: '#ef4444'
  }
];

const stats = [
  { number: 150, label: 'Projects Completed', suffix: '+' },
  { number: 98, label: 'Client Satisfaction', suffix: '%' },
  { number: 5, label: 'Years Experience', suffix: '+' },
  { number: 24, label: 'Support Hours', suffix: '/7' }
];

const Services = () => {
  const servicesRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const isInView = useInView(servicesRef, { once: true });

  useEffect(() => {
    if (isInView) {
      gsap.fromTo('.services__card',
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotateY: 45
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );

      gsap.fromTo('.stat-card',
        {
          opacity: 0,
          scale: 0.5
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.5
        }
      );
    }
  }, [isInView]);

  return (
    <section className="services" id="services" ref={servicesRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="services__header scroll-reveal"
        >
          <h2 className="services__title">Our Expertise</h2>
          <p className="services__subtitle">Comprehensive solutions powered by cutting-edge technology</p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="services__stats scroll-reveal"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <div className="stat-number">
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="services__grid">
          {services.map((service, idx) => (
            <motion.div
              className={`services__card ${hoveredCard === idx ? 'hovered' : ''}`}
              key={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setSelectedService(service)}
              style={{ '--service-color': service.color }}
            >
              <div className="card__background"></div>
              <div className="services__icon">
                <span>{service.icon}</span>
                <div className="icon-glow"></div>
              </div>

              <div className="card__content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>

                <div className="service__features">
                  {service.features.slice(0, 2).map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                </div>

                <div className="service__progress">
                  <div className="progress-label">
                    <span>Expertise Level</span>
                    <span>{service.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${service.progress}%` } : {}}
                      transition={{ duration: 1.5, delay: idx * 0.2 + 0.5 }}
                    ></motion.div>
                  </div>
                </div>

                <div className="service__stats">
                  <div className="service-stat">
                    <CountUp
                      end={service.projects}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    <span>Projects</span>
                  </div>
                </div>
              </div>

              <div className="card__hover-effect"></div>
            </motion.div>
          ))}
        </div>

        {/* Service Modal */}
        {selectedService && (
          <motion.div
            className="service-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedService(null)}>×</button>
              <div className="modal-header">
                <div className="modal-icon" style={{ color: selectedService.color }}>
                  {selectedService.icon}
                </div>
                <h3>{selectedService.title}</h3>
              </div>
              <div className="modal-body">
                <p>{selectedService.longDesc}</p>
                <div className="modal-features">
                  <h4>Key Technologies & Skills:</h4>
                  <div className="features-grid">
                    {selectedService.features.map((feature, i) => (
                      <span key={i} className="feature-item">{feature}</span>
                    ))}
                  </div>
                </div>
                <div className="modal-stats">
                  <div className="modal-stat">
                    <span className="stat-value">{selectedService.progress}%</span>
                    <span className="stat-label">Expertise</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-value">{selectedService.projects}+</span>
                    <span className="stat-label">Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
