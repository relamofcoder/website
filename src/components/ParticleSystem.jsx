import React, { useEffect, useRef, useState } from 'react';
import './ParticleSystem.css';

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouseTimeout;

    // Optimized particle system
    const particles = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 0.5,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      type: i % 4, // Different particle types
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      originalR: 0,
      color: ['rgba(56,189,248,', 'rgba(162,28,175,', 'rgba(6,182,212,', 'rgba(168,85,247,'][i % 4]
    }));

    particles.forEach(p => p.originalR = p.r);

    // Reduced floating shapes for performance
    const shapes = Array.from({ length: 5 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 40 + 20,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: Math.floor(Math.random() * 3), // 0: circle, 1: triangle, 2: square
      opacity: Math.random() * 0.1 + 0.05,
      color: ['rgba(56,189,248,', 'rgba(162,28,175,', 'rgba(245,158,11,'][Math.floor(Math.random() * 3)]
    }));

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    function handleMouseMove(e) {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    }
    window.addEventListener('mousemove', handleMouseMove);

    function drawParticle(p, time) {
      // Pulsing effect
      const pulse = Math.sin(time * p.pulseSpeed + p.phase) * 0.5 + 0.5;
      p.r = p.originalR + pulse * 1;

      // Mouse interaction
      const dx = mousePos.x - p.x;
      const dy = mousePos.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150 && isMouseMoving) {
        const force = (150 - distance) / 150;
        p.x -= (dx / distance) * force * 2;
        p.y -= (dy / distance) * force * 2;
        p.opacity = Math.min(1, p.opacity + force * 0.5);
      } else {
        p.opacity = Math.max(0.2, p.opacity - 0.01);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();

      // Add glow effect
      if (p.opacity > 0.5) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, 2 * Math.PI);
        ctx.fillStyle = p.color + (p.opacity * 0.2) + ')';
        ctx.fill();
      }
    }

    function drawShape(shape) {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.fillStyle = shape.color + shape.opacity + ')';

      switch (shape.type) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 1: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 2: // Square
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          break;
      }
      ctx.restore();
    }

    function drawConnections() {
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56,189,248,${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    }

    function animate() {
      const time = Date.now() * 0.001;

      // Create gradient background effect
      const gradient = ctx.createRadialGradient(
        mousePos.x, mousePos.y, 0,
        mousePos.x, mousePos.y, 300
      );
      gradient.addColorStop(0, 'rgba(56,189,248,0.02)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMouseMoving) {
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw shapes
      shapes.forEach(shape => {
        shape.x += shape.dx;
        shape.y += shape.dy;
        shape.rotation += shape.rotationSpeed;

        // Bounce off edges
        if (shape.x < 0 || shape.x > canvas.width) shape.dx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.dy *= -1;

        drawShape(shape);
      });

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        drawParticle(p, time);
      });

      // Draw connections between particles
      drawConnections();

      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      clearTimeout(mouseTimeout);
    };
  }, [mousePos, isMouseMoving]);

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <div className="background-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="floating-orb orb-4"></div>
        <div className="floating-orb orb-5"></div>
      </div>
    </>
  );
};

export default ParticleSystem;
