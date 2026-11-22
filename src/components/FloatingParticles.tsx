"use client";

import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  count?: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  swaySpeed: number;
  swayAmount: number;
  swayAngle: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  glowColor: string;
  isStar: boolean;
  starRotation: number;
  rotationSpeed: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 90 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Festive Luxury Color Palette
    const palette = [
      { color: "#FDE68A", glow: "#F59E0B" }, // Shimmering Gold
      { color: "#FCD34D", glow: "#D97706" }, // Rich Amber Gold
      { color: "#FFFBEB", glow: "#FBBF24" }, // Luminous Champagne
      { color: "#E0A96D", glow: "#B99A80" }, // Antique Gold
      { color: "#F43F5E", glow: "#BE123C" }, // Radiant Crimson Ember
      { color: "#FB7185", glow: "#9F1239" }, // Soft Burgundy Spark
    ];

    const particles: Particle[] = [];
    const actualCount = Math.min(count, Math.floor((width * height) / 12000) + 40);

    for (let i = 0; i < actualCount; i++) {
      const pColor = palette[Math.floor(Math.random() * palette.length)];
      const isStar = Math.random() < 0.28; // ~28% of particles are twinkling 4-point stars
      const baseRadius = isStar
        ? Math.random() * 2.2 + 1.8
        : Math.random() < 0.18
        ? Math.random() * 3.5 + 2.5 // Large glowing bokeh orbs
        : Math.random() * 1.8 + 0.8; // Medium floating stardust

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRadius,
        baseRadius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.25, // Gentle upward romantic float
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayAmount: Math.random() * 1.2 + 0.4,
        swayAngle: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.6 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.4,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        color: pColor.color,
        glowColor: pColor.glow,
        isStar,
        starRotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Function to draw an elegant 4-point diamond star
    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      rotation: number
    ) => {
      context.save();
      context.translate(cx, cy);
      context.rotate(rotation);
      context.beginPath();

      const inner = size * 0.22;
      for (let i = 0; i < 4; i++) {
        const armAngle = (i * Math.PI) / 2;
        const valleyAngle = armAngle + Math.PI / 4;

        if (i === 0) {
          context.moveTo(Math.cos(armAngle) * size, Math.sin(armAngle) * size);
        } else {
          context.lineTo(Math.cos(armAngle) * size, Math.sin(armAngle) * size);
        }
        context.lineTo(Math.cos(valleyAngle) * inner, Math.sin(valleyAngle) * inner);
      }

      context.closePath();
      context.fill();
      context.restore();
    };

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen"; // Additive glow for festive magnificence

      time += 0.02;

      for (let p of particles) {
        p.swayAngle += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayAngle) * p.swayAmount * 0.3;
        p.y += p.vy;

        p.twinklePhase += p.twinkleSpeed;
        p.starRotation += p.rotationSpeed;

        // Dynamic twinkling luminosity
        const twinkleFactor = (Math.sin(p.twinklePhase) + 1) / 2;
        p.alpha = p.baseAlpha * 0.5 + twinkleFactor * p.baseAlpha * 0.7;

        // Screen wrap-around
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));

        // Radiant multi-layer glow
        ctx.shadowBlur = p.isStar ? 14 : p.baseRadius > 2.5 ? 20 : 8;
        ctx.shadowColor = p.glowColor;
        ctx.fillStyle = p.color;

        if (p.isStar) {
          // Draw sparkling star
          const starSize = p.radius * (0.8 + twinkleFactor * 0.5);
          drawStar(ctx, p.x, p.y, starSize * 2.2, p.starRotation);
        } else {
          // Draw glowing round ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Soft outer halo for larger particles
          if (p.baseRadius > 2.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = p.glowColor;
            ctx.globalAlpha = p.alpha * 0.25;
            ctx.fill();
          }
        }

        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
