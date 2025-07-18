import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import CountUp from 'react-countup';
import { useIntersection } from 'react-use';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const floatingRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const texts = [
    'Professional Web Solutions',
    'Modern UI/UX Design',
    'Full-Stack Development',
    'Digital Innovation'
  ];

  const controls = useAnimation();
  const isInView = useInView(heroRef, { once: true });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentText = texts[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setTypedText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  // GSAP animations
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);

      // Floating elements animation
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3
      });

      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, [isInView]);

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
        <div className="floating-element floating-4"></div>
      </div>

      {/* Animated Background Gradient */}
      <div className="hero-bg-gradient"></div>

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, x: -100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="hero__title"
            ref={titleRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Welcome to <span className="gradient-text">Realm of Coder</span>
          </motion.h1>

          <div className="hero__subtitle-container">
            <span className="typing-text">{typedText}</span>
            <span className="cursor">|</span>
          </div>

          {/* Statistics */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="stat-item">
              <CountUp end={100} duration={2.5} suffix="+" />
              <span>Projects</span>
            </div>
            <div className="stat-item">
              <CountUp end={50} duration={2.5} suffix="+" />
              <span>Clients</span>
            </div>
            <div className="stat-item">
              <CountUp end={5} duration={2.5} suffix="+" />
              <span>Years</span>
            </div>
          </motion.div>

          <motion.a
            href="#portfolio"
            className="hero__cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore Portfolio</span>
            <div className="cta-glow"></div>
          </motion.a>
        </motion.div>

        <motion.div
          className="hero__animation"
          initial={{ opacity: 0, x: 100, scale: 0.5 }}
          animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="animation-container">
            {/* DNA Helix Structure */}
            <motion.div
              className="dna-helix"
              initial={{ scale: 0, rotateY: -180 }}
              animate={isVisible ? { scale: 1, rotateY: 0 } : {}}
              transition={{ duration: isMobile ? 1 : 2.5, delay: 0.8 }}
            >
              {/* Create multiple spiral strand segments */}
              {Array.from({ length: 5 }, (_, i) => (
                <div key={`strand1-${i}`} className="dna-strand strand-1"></div>
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <div key={`strand2-${i}`} className="dna-strand strand-2"></div>
              ))}

              {/* DNA Base pairs connecting the strands */}
              {Array.from({ length: isMobile ? 8 : 15 }, (_, i) => (
                <motion.div
                  key={i}
                  className="dna-base"
                  style={{
                    top: `${i * (isMobile ? 30 : 25)}px`,
                    animationDelay: `${i * 0.15}s`
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 + i * 0.08 }}
                />
              ))}
            </motion.div>

            {/* Morphing Geometric Shape */}
            <motion.div
              className="morph-container"
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: isMobile ? 1 : 2, delay: 1.2 }}
            >
              <div className="morphing-shape"></div>
            </motion.div>

            {/* Fractal Tree - Hidden on mobile */}
            {!isMobile && (
              <motion.div
                className="fractal-tree"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 2 }}
              >
                <div className="tree-branch branch-main"></div>
                <div className="tree-branch branch-left"></div>
                <div className="tree-branch branch-right"></div>
              </motion.div>
            )}

            {/* Particle Explosion Effect - Hidden on mobile */}
            {!isMobile && (
              <motion.div
                className="explosion-container"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 2.5 }}
              >
                {Array.from({ length: 8 }, (_, i) => {
                  const angle = (i * 45) * Math.PI / 180;
                  const x = Math.cos(angle) * 120;
                  const y = Math.sin(angle) * 120;
                  return (
                    <motion.div
                      key={i}
                      className="explosion-particle"
                      style={{
                        '--x': `${x}px`,
                        '--y': `${y}px`,
                        animationDelay: `${i * 0.3}s`
                      }}
                      initial={{ opacity: 0 }}
                      animate={isVisible ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 3 + i * 0.1 }}
                    />
                  );
                })}
              </motion.div>
            )}

            {/* Neural Network - Hidden on mobile */}
            {!isMobile && (
              <motion.div
                className="neural-network"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 3.5 }}
              >
                {/* Neural Nodes */}
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={`node-${i}`}
                    className="neural-node"
                    style={{
                      top: `${25 + (i % 3) * 25}%`,
                      left: `${25 + Math.floor(i / 3) * 50}%`,
                      animationDelay: `${i * 0.4}s`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 4 + i * 0.1 }}
                  />
                ))}

                {/* Neural Connections */}
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={`connection-${i}`}
                    className="neural-connection"
                    style={{
                      top: `${35 + i * 20}%`,
                      left: '30%',
                      width: '40%',
                      animationDelay: `${i * 0.5}s`
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 4.5 + i * 0.2 }}
                  />
                ))}
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
