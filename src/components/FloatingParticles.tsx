"use client";

import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  count?: number;
}

interface Particle {
  x: number;
  y: number;
  z: number; // 3D depth simulation (0.15 = far, 1.0 = close)
  coreRadius: number;
  haloRadius: number;
  vx: number;
  vy: number;
  swaySpeed: number;
  swayAmount: number;
  swayAngle: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hueShift: number; // Subtle variety in golden amber tone
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 95 }) => {
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

    const particles: Particle[] = [];
    const actualCount = Math.min(count, Math.floor((width * height) / 14000) + 40);

    for (let i = 0; i < actualCount; i++) {
      // Depth simulation (few large foreground orbs, many distant embers)
      const z = Math.pow(Math.random(), 1.8) * 0.85 + 0.15; // 0.15 to 1.0

      // Core and halo radii scaled by depth
      const coreRadius = z > 0.75 ? Math.random() * 1.5 + 2.2 : Math.random() * 1.0 + 0.8;
      const haloRadius = coreRadius * (z > 0.7 ? Math.random() * 5 + 4.5 : Math.random() * 4 + 3);

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        coreRadius,
        haloRadius,
        vx: (Math.random() - 0.5) * 0.25 * z,
        vy: (-Math.random() * 0.45 - 0.15) * z, // Upward floating drift proportional to depth
        swaySpeed: Math.random() * 0.015 + 0.006,
        swayAmount: (Math.random() * 1.2 + 0.4) * z,
        swayAngle: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.4 + 0.5,
        baseAlpha: Math.random() * 0.35 + (z > 0.7 ? 0.65 : 0.45),
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        hueShift: (Math.random() - 0.5) * 10, // Variation around amber gold (38deg - 48deg)
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Additive screen blend mode for photographic optical glow
      ctx.globalCompositeOperation = "screen";

      for (let p of particles) {
        // Natural swaying drift physics
        p.swayAngle += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayAngle) * (p.swayAmount * 0.25);
        p.y += p.vy;

        // Gentle breathing twinkle
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        const currentAlpha = p.baseAlpha * 0.65 + twinkle * (p.baseAlpha * 0.35);

        // Screen boundary wrap-around
        if (p.y < -p.haloRadius * 2) {
          p.y = height + p.haloRadius * 2;
          p.x = Math.random() * width;
        }
        if (p.x < -p.haloRadius * 2) p.x = width + p.haloRadius * 2;
        if (p.x > width + p.haloRadius * 2) p.x = -p.haloRadius * 2;

        ctx.save();

        // 1. Warm Golden Halo (Optical Radial Falloff)
        const outerGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.haloRadius);
        // Center: Intense white-hot luminescence
        outerGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.95})`);
        // Inner aura: Pale golden yellow
        outerGrad.addColorStop(0.18, `rgba(254, 240, 138, ${currentAlpha * 0.85})`);
        // Mid aura: Warm amber gold
        outerGrad.addColorStop(0.48, `rgba(245, 158, 11, ${currentAlpha * 0.45})`);
        // Outer halo: Deep golden ember tone
        outerGrad.addColorStop(0.78, `rgba(217, 119, 6, ${currentAlpha * 0.15})`);
        // Fade to transparent
        outerGrad.addColorStop(1, "rgba(217, 119, 6, 0)");

        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Solid Incandescent White Core (Pinpoint of light)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, currentAlpha * 1.1)})`;
        ctx.shadowColor = "rgba(245, 158, 11, 0.85)";
        ctx.shadowBlur = p.z > 0.6 ? 8 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.coreRadius, 0, Math.PI * 2);
        ctx.fill();

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
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">
      {/* Subtle warm amber ambient vignette matching the reference image */}
      <div className="absolute inset-0 bg-radial from-amber-950/15 via-transparent to-black/60 pointer-events-none" />

      {/* Floating Golden Light Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90 transition-opacity duration-1000"
        aria-hidden="true"
      />
    </div>
  );
};
