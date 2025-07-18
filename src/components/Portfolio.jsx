import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import './Portfolio.css';

const projects = [
  // Full-Stack Projects
  {
    id: 1,
    title: 'E-Commerce Platform',
    desc: 'Complete online shopping solution with payment gateway, inventory management, and admin dashboard.',
    longDesc: 'A comprehensive e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration with Stripe, order tracking, inventory management, and responsive design.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
    category: 'Full-Stack',
    github: 'https://github.com/relamofcoder',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management System',
    desc: 'Collaborative project management tool with real-time updates and team collaboration features.',
    longDesc: 'A comprehensive task management system with drag-and-drop functionality, real-time collaboration, file sharing, and advanced reporting. Built for teams to manage projects efficiently.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Socket.io', 'Redis'],
    category: 'Full-Stack',
    github: 'https://github.com/relamofcoder',
    featured: false
  },
  {
    id: 3,
    title: 'Learning Management System',
    desc: 'Educational platform with course management, video streaming, and progress tracking.',
    longDesc: 'A complete LMS solution for educational institutions with course creation, video streaming, assignments, quizzes, and student progress tracking. Includes payment integration for course purchases.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    tech: ['React', 'Django', 'PostgreSQL', 'AWS S3', 'Stripe'],
    category: 'Full-Stack',
    github: 'https://github.com/relamofcoder',
    featured: true
  },

  // AI/ML Projects
  {
    id: 4,
    title: 'AI-Powered Analytics Dashboard',
    desc: 'Business intelligence dashboard with machine learning insights and predictive analytics.',
    longDesc: 'An intelligent dashboard that provides business insights using AI and machine learning. Built with React, Python, and TensorFlow for predictive analytics and data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tech: ['React', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL'],
    category: 'AI/ML',
    github: 'https://github.com/relamofcoder',
    featured: true
  },
  {
    id: 5,
    title: 'Image Recognition System',
    desc: 'Deep learning model for object detection and classification with real-time processing.',
    longDesc: 'Advanced computer vision system using CNN and YOLO for real-time object detection and classification. Includes web interface for image upload and batch processing capabilities.',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=400&fit=crop',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'Docker'],
    category: 'AI/ML',
    github: 'https://github.com/relamofcoder',
    featured: false
  },
  {
    id: 6,
    title: 'Chatbot Assistant',
    desc: 'Intelligent conversational AI with natural language processing and context awareness.',
    longDesc: 'A sophisticated chatbot built with NLP capabilities, context understanding, and integration with multiple platforms. Features include sentiment analysis and automated responses.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    tech: ['Python', 'NLTK', 'Transformers', 'FastAPI', 'MongoDB'],
    category: 'AI/ML',
    github: 'https://github.com/relamofcoder',
    featured: false
  },

  // Mobile Projects
  {
    id: 7,
    title: 'Food Delivery App',
    desc: 'Complete food ordering and delivery mobile application with real-time tracking.',
    longDesc: 'A comprehensive food delivery app with restaurant listings, order management, real-time tracking, payment integration, and rating system. Built for both customers and delivery partners.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    tech: ['React Native', 'Firebase', 'Google Maps', 'Stripe', 'Node.js'],
    category: 'Mobile',
    github: 'https://github.com/relamofcoder',
    featured: true
  },
  {
    id: 8,
    title: 'Fitness Tracker App',
    desc: 'Health and fitness tracking application with workout plans and progress monitoring.',
    longDesc: 'A comprehensive fitness app with workout tracking, nutrition planning, progress analytics, and social features. Includes integration with wearable devices and health APIs.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    tech: ['Flutter', 'Dart', 'Firebase', 'HealthKit', 'SQLite'],
    category: 'Mobile',
    github: 'https://github.com/relamofcoder',
    featured: false
  },
  {
    id: 9,
    title: 'Banking Mobile App',
    desc: 'Secure mobile banking application with biometric authentication and transaction management.',
    longDesc: 'A secure mobile banking application with biometric authentication, real-time transactions, budget tracking, bill payments, and investment portfolio management.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
    tech: ['React Native', 'Firebase', 'Node.js', 'Biometric API', 'Encryption'],
    category: 'Mobile',
    github: 'https://github.com/relamofcoder',
    featured: false
  },

  // Web App Projects
  {
    id: 10,
    title: 'Social Media Platform',
    desc: 'Modern social networking platform with real-time messaging and content sharing.',
    longDesc: 'A feature-rich social media platform with real-time messaging, content sharing, live streaming, stories, and advanced privacy controls. Built for scalability and performance.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
    tech: ['Next.js', 'Socket.io', 'Redis', 'AWS', 'GraphQL'],
    category: 'Web App',
    github: 'https://github.com/relamofcoder',
    featured: true
  },
  {
    id: 11,
    title: 'Video Streaming Platform',
    desc: 'Netflix-like streaming service with content management and subscription system.',
    longDesc: 'A complete video streaming platform with content upload, transcoding, adaptive streaming, user subscriptions, and content recommendation system.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
    tech: ['React', 'Node.js', 'AWS S3', 'FFmpeg', 'MongoDB'],
    category: 'Web App',
    github: 'https://github.com/relamofcoder',
    featured: false
  },
  {
    id: 12,
    title: 'Real Estate Platform',
    desc: 'Property listing and management system with virtual tours and mortgage calculator.',
    longDesc: 'A comprehensive real estate platform with property listings, virtual tours, mortgage calculator, agent profiles, and advanced search filters. Includes CRM for agents.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps', 'Stripe'],
    category: 'Web App',
    github: 'https://github.com/relamofcoder',
    featured: false
  }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const portfolioRef = useRef(null);
  const isInView = useInView(portfolioRef, { once: true });

  const categories = ['All', 'Full-Stack', 'AI/ML', 'Mobile', 'Web App'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  useEffect(() => {
    if (isInView) {
      gsap.fromTo('.portfolio__card',
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
  }, [isInView, filter]);

  return (
    <section className="portfolio" id="portfolio" ref={portfolioRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="portfolio__header scroll-reveal"
        >
          <h2 className="portfolio__title">Featured Projects</h2>
          <p className="portfolio__subtitle">Showcasing innovative solutions and cutting-edge technologies</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="portfolio__filters scroll-reveal"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="portfolio__grid">
          {filteredProjects.map((project, idx) => (
            <motion.div
              className={`portfolio__card ${project.featured ? 'featured' : ''}`}
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="card__image">
                <img src={project.image} alt={project.title} />
                <div className="card__overlay">
                  <div className="overlay__content">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="project__tech">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card__content">
                <div className="card__header">
                  <h3>{project.title}</h3>
                  <span className="category-badge">{project.category}</span>
                </div>
                <p>{project.desc}</p>
                <div className="card__footer">
                  <div className="project__links">
                    <a href={project.github} className="btn-primary">View Code</a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                <p className="modal-desc">{selectedProject.longDesc}</p>
                <div className="modal-tech">
                  <h4>Technologies Used:</h4>
                  <div className="tech-list">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="modal-links">
                  <a href={selectedProject.github} className="btn-primary">View Code</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
