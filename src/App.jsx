import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ParticleSystem from './components/ParticleSystem';
import CustomCursor from './components/CustomCursor';
import SmoothScrolling from './components/SmoothScrolling';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrolling>
      <ScrollProgress />
      <ParticleSystem />
      <CustomCursor />
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <Header />
          <main>
            <Hero />
            <Services />
            <Portfolio />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      <BackToTop />
    </SmoothScrolling>
  );
}

export default App;
