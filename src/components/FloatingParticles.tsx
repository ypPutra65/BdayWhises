"use client";

import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  count?: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
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
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 38 }) => {
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

    // Quiet Luxury Editorial Palette (Warm Gold, Soft Champagne, Pure Ivory)
    const luxuryPalette = [
      { color: "#EDE4DC", glow: "#B99A80" }, // Soft Warm Ivory
      { color: "#DFCCA8", glow: "#A08268" }, // Pale Champagne Gold
      { color: "#CBB396", glow: "#8C6E54" }, // Antique Gold Mote
      { color: "#E8D8C4", glow: "#9E7D62" }, // Whisper Gold
    ];

    const particles: Particle[] = [];
    // Balanced particle count based on screen area with spacious negative space
    const actualCount = Math.min(count, Math.floor((width * height) / 32000) + 20);

    for (let i = 0; i < actualCount; i++) {
      const pColor = luxuryPalette[Math.floor(Math.random() * luxuryPalette.length)];
      // Microscopic, delicate dust sizes for high-end cinematic ambiance
      const radius =
        Math.random() < 0.8
          ? Math.random() * 0.7 + 0.6 // 0.6px - 1.3px (fine celestial dust)
          : Math.random() * 0.8 + 1.3; // 1.3px - 2.1px (soft warm ember)

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.1, // Ultra-slow, serene upward drift
        swaySpeed: Math.random() * 0.012 + 0.005,
        swayAmount: Math.random() * 0.8 + 0.3,
        swayAngle: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.25 + 0.1,
        baseAlpha: Math.random() * 0.28 + 0.12,
        twinkleSpeed: Math.random() * 0.018 + 0.008, // Gentle breathing shimmer
        twinklePhase: Math.random() * Math.PI * 2,
        color: pColor.color,
        glowColor: pColor.glow,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.swayAngle += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayAngle) * (p.swayAmount * 0.2);
        p.y += p.vy;

        p.twinklePhase += p.twinkleSpeed;

        // Subtle organic breathing luminosity
        const twinkleFactor = (Math.sin(p.twinklePhase) + 1) / 2;
        p.alpha = p.baseAlpha * 0.6 + twinkleFactor * p.baseAlpha * 0.6;

        // Screen wrap-around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = Math.max(0.04, Math.min(0.55, p.alpha));

        // Refined, subtle glow (never harsh or blinding)
        ctx.shadowBlur = p.radius > 1.3 ? 5 : 2;
        ctx.shadowColor = p.glowColor;
        ctx.fillStyle = p.color;

        // Draw delicate celestial dust particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
