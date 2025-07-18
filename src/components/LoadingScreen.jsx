import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing...');

  const loadingTexts = [
    'Initializing...',
    'Loading Assets...',
    'Preparing Interface...',
    'Optimizing Performance...',
    'Almost Ready...',
    'Welcome to Realm of Coder!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;

        // Update text based on progress
        if (newProgress < 20) {
          setCurrentText(loadingTexts[0]);
        } else if (newProgress < 40) {
          setCurrentText(loadingTexts[1]);
        } else if (newProgress < 60) {
          setCurrentText(loadingTexts[2]);
        } else if (newProgress < 80) {
          setCurrentText(loadingTexts[3]);
        } else if (newProgress < 95) {
          setCurrentText(loadingTexts[4]);
        } else {
          setCurrentText(loadingTexts[5]);
        }

        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background */}
        <div className="loading-bg">
          <div className="bg-gradient"></div>
          <div className="floating-particles">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Loading Content */}
        <div className="loading-content">
          {/* Animated Logo */}
          <motion.div
            className="loading-logo"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <div className="logo-ring ring-1"></div>
            <div className="logo-ring ring-2"></div>
            <div className="logo-ring ring-3"></div>
            <div className="logo-center">
              <span>RC</span>
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            className="loading-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Realm of Coder
          </motion.h1>

          {/* Progress Bar */}
          <motion.div
            className="progress-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <div className="progress-glow"></div>
            </div>
            <div className="progress-text">
              <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="loading-text"
            key={currentText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentText}
          </motion.div>

          {/* Loading Dots */}
          <div className="loading-dots">
            <motion.div
              className="dot"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            ></motion.div>
            <motion.div
              className="dot"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            ></motion.div>
            <motion.div
              className="dot"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            ></motion.div>
          </div>

          {/* Tech Stack Icons */}
          <motion.div
            className="tech-icons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="tech-icon">⚛️</div>
            <div className="tech-icon">🚀</div>
            <div className="tech-icon">💻</div>
            <div className="tech-icon">🎨</div>
            <div className="tech-icon">⚡</div>
          </motion.div>
        </div>

        {/* Loading Spinner Overlay */}
        <div className="spinner-overlay">
          <div className="main-spinner"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
