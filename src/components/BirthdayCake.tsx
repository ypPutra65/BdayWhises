"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayData } from "@/data/birthday";

interface CandleProps {
  index: number;
  isBlown: boolean;
  extinguishDelay: number;
  windTilt: number;
  isNearCursor: boolean;
  isTapped: boolean;
  onCandleClick: (index: number) => void;
  tier: 1 | 2 | 3;
}

const RealisticCandle: React.FC<CandleProps> = ({
  index,
  isBlown,
  extinguishDelay,
  windTilt,
  isNearCursor,
  isTapped,
  onCandleClick,
  tier,
}) => {
  // Unique natural flicker speed and phase per candle
  const flickerDuration = 1.3 + ((index * 3) % 7) * 0.14;
  const flickerDelay = ((index * 0.23) % 1.5).toFixed(2);

  // Proximity & interactive breeze response
  const totalTilt = isBlown
    ? windTilt * 1.5 + (index % 2 === 0 ? 8 : -8)
    : windTilt + (isNearCursor ? (windTilt !== 0 ? windTilt * 0.5 : (index % 2 === 0 ? 3 : -3)) : 0);

  // Responsive candle heights per tier
  const candleHeight =
    tier === 1
      ? "h-6 sm:h-8"
      : tier === 2
      ? "h-5 sm:h-7"
      : "h-5 sm:h-6.5";

  return (
    <div
      onClick={() => onCandleClick(index)}
      className="group relative flex flex-col items-center cursor-pointer select-none transition-transform duration-300 hover:scale-105"
      style={{ touchAction: "manipulation" }}
      title="Tap to make candle sparkle"
    >
      {/* 1. Wispy Smoke on Extinguish */}
      <AnimatePresence>
        {isBlown && (
          <motion.div
            className="absolute -top-7 pointer-events-none z-30"
            initial={{ opacity: 0.85, y: 0, scale: 0.7, x: 0 }}
            animate={{
              opacity: 0,
              y: -36,
              scale: [0.7, 1.4, 2.4],
              x: (index % 2 === 0 ? 1 : -1) * (5 + (index % 4) * 2.5),
            }}
            transition={{
              duration: 2.2,
              delay: extinguishDelay,
              ease: "easeOut",
            }}
          >
            <svg
              width="20"
              height="38"
              viewBox="0 0 20 38"
              fill="none"
              className="opacity-75 blur-[0.6px]"
            >
              <path
                d="M10,36 C13,28 7,22 12,15 C15,9 9,4 12,0"
                stroke="rgba(237, 228, 220, 0.45)"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Ambient Warm Halo Glow */}
      <div
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full pointer-events-none transition-all duration-300 ${
          isBlown ? "opacity-0 scale-0" : "opacity-80"
        }`}
        style={{
          width: `${24 + (isNearCursor ? 12 : 0)}px`,
          height: `${28 + (isNearCursor ? 12 : 0)}px`,
          background:
            "radial-gradient(circle, rgba(251,191,36,0.65) 0%, rgba(245,158,11,0.3) 45%, rgba(220,38,38,0.08) 75%, transparent 100%)",
          filter: "blur(4.5px)",
          transform: `translate(-50%, -20%) scale(${isTapped ? 1.5 : 1})`,
        }}
      />

      {/* 3. The Teardrop Realistic Flame */}
      <div
        className="relative origin-bottom transition-all"
        style={{
          transform: isBlown
            ? "scale(0) translateY(-10px) rotate(12deg)"
            : `rotate(${totalTilt}deg) scale(${isTapped ? 1.3 : isNearCursor ? 1.15 : 1})`,
          opacity: isBlown ? 0 : 1,
          filter: isBlown ? "blur(2px)" : "none",
          transition: isBlown
            ? `transform 0.35s ease-out ${extinguishDelay}s, opacity 0.35s ease-out ${extinguishDelay}s, filter 0.35s ease-out ${extinguishDelay}s`
            : "transform 0.16s cubic-bezier(0.2, 0, 0.2, 1)",
        }}
      >
        <div
          className="relative w-3 h-5 sm:w-3.5 sm:h-6 origin-bottom"
          style={{
            animation: `flameOrganicFlicker ${flickerDuration}s ease-in-out ${flickerDelay}s infinite alternate`,
          }}
        >
          <svg
            viewBox="0 0 24 40"
            className="w-full h-full overflow-visible drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]"
          >
            <defs>
              {/* Outer flame gradient: red base -> orange -> amber -> golden yellow tip */}
              <linearGradient id={`flameGrad-${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="22%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="82%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Inner core: incandescent white-hot teardrop */}
              <linearGradient id={`coreGrad-${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Blue combustion base */}
              <radialGradient id={`blueBase-${index}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#1d4ed8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Outer Teardrop Body */}
            <path
              d="M 12,2 C 14.8,9.5 20.5,18.5 20.5,27 C 20.5,33.5 16.7,37.5 12,37.5 C 7.3,37.5 3.5,33.5 3.5,27 C 3.5,18.5 9.2,9.5 12,2 Z"
              fill={`url(#flameGrad-${index})`}
            />

            {/* Inner Core Teardrop */}
            <path
              d="M 12,13 C 13.5,17.5 16.5,22 16.5,27.5 C 16.5,32 14.5,34.5 12,34.5 C 9.5,34.5 7.5,32 7.5,27.5 C 7.5,22 10.5,17.5 12,13 Z"
              fill={`url(#coreGrad-${index})`}
            />

            {/* Blue Combustion Base at the Wick */}
            <ellipse cx="12" cy="35.5" rx="3.8" ry="1.8" fill={`url(#blueBase-${index})`} />
          </svg>
        </div>
      </div>

      {/* 4. Carbon Wick with Incandescent Ember */}
      <div className="relative flex flex-col items-center">
        {/* Glowing Ember Point */}
        <div
          className={`w-[2px] h-[2px] rounded-full -mb-[1px] z-10 transition-colors duration-1000 ${
            isBlown
              ? "bg-[#ff4500] shadow-[0_0_3px_#ff4500] opacity-80"
              : "bg-[#fff7ed] shadow-[0_0_2px_#f97316] opacity-100"
          }`}
          style={{
            transitionDelay: isBlown ? `${extinguishDelay}s` : "0s",
          }}
        />
        {/* Wick stick */}
        <div className="w-[1.2px] h-1.5 sm:h-2 bg-stone-700" />
      </div>

      {/* 5. Candle Stick Body (Taper Wax with subtle gloss highlight) */}
      <div
        className={`w-1.5 sm:w-2 ${candleHeight} rounded-t-xs shadow-md relative overflow-hidden bg-gradient-to-r from-[#dcd3cb] via-[#f5efe8] to-[#ab988a]`}
      >
        {/* Subtle wax streak highlight */}
        <div className="absolute top-0 left-0 w-0.5 h-full bg-white/40" />
        {/* Burgundy dipped base accent */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-t from-burgundy/80 to-transparent" />
      </div>

      {/* 6. Melted Wax Pool at Base */}
      <div className="w-2.5 sm:w-3.5 h-1 -mt-0.5 rounded-full bg-antique-gold/30 blur-[0.4px]" />
    </div>
  );
};

export const BirthdayCake: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [isWishing, setIsWishing] = useState<boolean>(false);
  const [windTilt, setWindTilt] = useState<number>(0);
  const [hoveredCandleIndex, setHoveredCandleIndex] = useState<number | null>(null);
  const [tappedCandles, setTappedCandles] = useState<Record<number, boolean>>({});
  const cakeContainerRef = useRef<HTMLDivElement>(null);
  const windTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { cake } = birthdayData;

  // 1. Play Party Popper Audio Effect
  const playPopperAudio = useCallback(() => {
    try {
      const popperAudio = document.getElementById("popper-sfx") as HTMLAudioElement | null;
      if (popperAudio) {
        popperAudio.currentTime = 0;
        popperAudio.volume = 0.95;
        popperAudio.play().catch((err) => {
          console.warn("Popper audio play error:", err);
        });
      }
    } catch (e) {
      console.warn("Audio element error:", e);
    }

    // High-energy tactile pop impulse via Web Audio API for punchy response
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.45, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // Audio fallback silent
    }
  }, []);

  // 2. Interactive Chime when individual candle is tapped
  const playCandleChime = (index: number) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        // Musical harmonic frequencies for playful interaction
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5];
        const freq = notes[index % notes.length];
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.38);
      }
    } catch {
      // Chime fallback silent
    }
  };

  const handleCandleClick = (index: number) => {
    if (candlesBlown) return;
    playCandleChime(index);
    setTappedCandles((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setTappedCandles((prev) => ({ ...prev, [index]: false }));
    }, 600);
  };

  // 3. Pointer move creates realistic wind breeze physics on flames
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (candlesBlown) return;
    const movementX = e.movementX || 0;
    if (movementX !== 0) {
      const tilt = Math.max(-14, Math.min(14, movementX * 0.55));
      setWindTilt(tilt);

      if (windTimerRef.current) clearTimeout(windTimerRef.current);
      windTimerRef.current = setTimeout(() => {
        setWindTilt(0);
      }, 240);
    }
  };

  const handlePointerLeave = () => {
    setWindTilt(0);
    setHoveredCandleIndex(null);
  };

  // 4. Extinguish & Make a Wish Sequence
  const handleMakeWish = () => {
    if (candlesBlown || isWishing) return;
    setIsWishing(true);

    // Soft gentle breath audio synthesis
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.75;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.08 * (1 - i / bufferSize);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.75);

        noise.connect(filter);
        filter.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // Silent fallback
    }

    // Breath tilt effect
    setWindTilt(12);

    // Cascading extinguish sequence
    setTimeout(() => {
      setCandlesBlown(true);
      setIsWishing(false);
      setWindTilt(0);

      // Play party popper explosion sound effect!
      playPopperAudio();

      // Luxury-toned confetti sequence
      const luxuryColors = ["#B99A80", "#EDE4DC", "#781E30", "#4A101D", "#D4AF37", "#FFFFFF"];

      // First main burst
      confetti({
        particleCount: 95,
        spread: 90,
        origin: { y: 0.65 },
        colors: luxuryColors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.15,
      });

      // Side cannons burst with secondary pop after 320ms
      setTimeout(() => {
        playPopperAudio();
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 65,
          origin: { x: 0.15, y: 0.7 },
          colors: luxuryColors,
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 65,
          origin: { x: 0.85, y: 0.7 },
          colors: luxuryColors,
        });
      }, 320);

      // Gentle golden rain after 700ms
      setTimeout(() => {
        confetti({
          particleCount: 45,
          spread: 100,
          origin: { y: 0.4 },
          colors: ["#B99A80", "#D4AF37", "#EDE4DC"],
          gravity: 0.6,
          scalar: 0.9,
        });
      }, 700);
    }, 750);
  };

  // 22 Candles Distribution across 3 Tiers:
  // Tier 1 (Top Tier): 5 candles (0..4)
  // Tier 2 (Middle Tier): 7 candles (5..11)
  // Tier 3 (Bottom Tier): 10 candles (12..21)
  // Sum = 5 + 7 + 10 = 22 candles!
  const tier1Candles = Array.from({ length: 5 });
  const tier2Candles = Array.from({ length: 7 });
  const tier3Candles = Array.from({ length: 10 });

  return (
    <section className="relative min-h-screen py-24 sm:py-36 px-4 sm:px-6 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
      {/* Embedded Audio Element for Party Popper SFX */}
      <audio id="popper-sfx" preload="auto">
        <source src="/music/popper.mp3" type="audio/mpeg" />
        <source src="/music/popper.m4a" type="audio/mp4" />
      </audio>

      {/* Ambient background candle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] bg-radial from-burgundy/40 via-oxblood/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        className="max-w-2xl mx-auto w-full flex flex-col items-center relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Title & Instructions */}
        <div className="mb-10 sm:mb-12">
          <span className="font-serif italic text-xs sm:text-sm tracking-[0.35em] uppercase text-antique-gold/75 block mb-2.5">
            Chapter XXII
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-wide mb-3 font-normal">
            {cake.title}
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-ivory/65 max-w-md mx-auto">
            {cake.instructions}
          </p>
        </div>

        {/* 3-TIER REAL LUXURY CAKE WITH 22 INTERACTIVE CANDLES */}
        <div
          ref={cakeContainerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative mb-14 flex flex-col items-center select-none w-full max-w-[460px]"
        >
          {/* ===================== TIER 1 (TOP TIER) ===================== */}
          {/* Top Row Candles: 5 Candles */}
          <div className="flex justify-center items-end gap-2.5 sm:gap-4 mb-0.5 z-30">
            {tier1Candles.map((_, i) => {
              const candleIndex = i; // 0..4
              const extinguishDelay = 0.35 + i * 0.05;

              return (
                <div
                  key={`candle-t1-${i}`}
                  onMouseEnter={() => setHoveredCandleIndex(candleIndex)}
                  onMouseLeave={() => setHoveredCandleIndex(null)}
                >
                  <RealisticCandle
                    index={candleIndex}
                    tier={1}
                    isBlown={candlesBlown}
                    extinguishDelay={extinguishDelay}
                    windTilt={windTilt}
                    isNearCursor={hoveredCandleIndex === candleIndex}
                    isTapped={!!tappedCandles[candleIndex]}
                    onCandleClick={handleCandleClick}
                  />
                </div>
              );
            })}
          </div>

          {/* Tier 1 Cake Body (Top Tier) */}
          <div className="relative w-[160px] sm:w-[210px] h-[52px] sm:h-[60px] rounded-t-xl shadow-xl flex flex-col items-center justify-center border-x border-antique-gold/25 z-25 overflow-hidden bg-gradient-to-r from-[#12080c] via-[#2a131b] via-[#3d1a27] via-[#2a131b] to-[#12080c]">
            {/* Glossy top deck glaze highlight */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-antique-gold/30 via-white/10 to-transparent" />

            {/* Scalloped Chocolate Ganache Drip Border */}
            <svg
              className="absolute top-0 inset-x-0 w-full h-3.5 sm:h-4 text-[#1a0b12] fill-current drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 L 100,0 L 100,5 C 95,11 93,17 89,17 C 85,17 83,6 79,5 C 75,5 73,19 69,19 C 65,19 63,7 59,5 C 55,5 53,13 49,13 C 45,13 43,5 39,5 C 35,5 33,20 29,20 C 25,20 23,7 19,5 C 15,5 13,15 9,15 C 5,15 3,5 0,5 Z" />
            </svg>

            {/* Embossed Roman Numerals XXII */}
            <div className="relative z-10 flex flex-col items-center mt-1">
              <span className="font-serif italic text-xs sm:text-sm tracking-[0.3em] text-antique-gold font-medium drop-shadow-sm">
                XXII
              </span>
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/50 to-transparent mt-0.5" />
            </div>

            {/* Edible Gold Leaf Flecks */}
            <div className="absolute top-4 left-3 w-1.5 h-1 bg-antique-gold/75 rotate-12 rounded-xs shadow-[0_0_3px_#d4af37]" />
            <div className="absolute bottom-3 right-4 w-1 h-1 bg-antique-gold/80 -rotate-45 rounded-xs shadow-[0_0_3px_#d4af37]" />

            {/* Buttercream Pearl Piping (Bottom rim) */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 flex justify-between px-1">
              {Array.from({ length: 18 }).map((_, p) => (
                <div
                  key={`p1-${p}`}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#3a1d26] via-antique-gold to-[#fff7ed] shadow-xs"
                />
              ))}
            </div>
          </div>

          {/* ===================== TIER 2 (MIDDLE TIER) ===================== */}
          {/* Middle Row Candles: 7 Candles */}
          <div className="flex justify-center items-end gap-2 sm:gap-3.5 -mt-3.5 mb-0.5 z-20">
            {tier2Candles.map((_, i) => {
              const candleIndex = 5 + i; // 5..11
              const extinguishDelay = 0.2 + i * 0.045;

              return (
                <div
                  key={`candle-t2-${i}`}
                  onMouseEnter={() => setHoveredCandleIndex(candleIndex)}
                  onMouseLeave={() => setHoveredCandleIndex(null)}
                >
                  <RealisticCandle
                    index={candleIndex}
                    tier={2}
                    isBlown={candlesBlown}
                    extinguishDelay={extinguishDelay}
                    windTilt={windTilt}
                    isNearCursor={hoveredCandleIndex === candleIndex}
                    isTapped={!!tappedCandles[candleIndex]}
                    onCandleClick={handleCandleClick}
                  />
                </div>
              );
            })}
          </div>

          {/* Tier 2 Cake Body (Middle Tier) */}
          <div className="relative w-[230px] sm:w-[310px] h-[58px] sm:h-[66px] rounded-t-xl shadow-2xl flex flex-col items-center justify-center border-x border-antique-gold/20 z-15 overflow-hidden bg-gradient-to-r from-[#10070b] via-[#241017] via-[#351622] via-[#241017] to-[#10070b]">
            {/* Glossy top ledge glaze */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-antique-gold/25 via-white/5 to-transparent" />

            {/* Scalloped Chocolate Ganache Drip Border */}
            <svg
              className="absolute top-0 inset-x-0 w-full h-3.5 sm:h-4 text-[#16080f] fill-current drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 L 100,0 L 100,5 C 96,12 94,18 90,18 C 86,18 84,6 80,5 C 76,5 74,18 70,18 C 66,18 64,6 60,5 C 56,5 54,14 50,14 C 46,14 44,6 40,5 C 36,5 34,19 30,19 C 26,19 24,6 20,5 C 16,5 14,15 10,15 C 6,15 4,5 0,5 Z" />
            </svg>

            {/* Elegant Filigree Ribbon with Diamond Accent */}
            <div className="relative z-10 flex items-center gap-2 mt-1 px-4">
              <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/40 to-antique-gold/70" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rotate-45 border border-antique-gold/80 bg-antique-gold/30" />
                <span className="font-serif italic text-[11px] sm:text-xs tracking-[0.28em] uppercase text-antique-gold/90 font-medium">
                  Bella
                </span>
                <span className="w-1.5 h-1.5 rotate-45 border border-antique-gold/80 bg-antique-gold/30" />
              </div>
              <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent via-antique-gold/40 to-antique-gold/70" />
            </div>

            {/* Edible Gold Leaf Flecks */}
            <div className="absolute top-4 right-6 w-1.5 h-1 bg-antique-gold/70 rotate-45 rounded-xs shadow-[0_0_3px_#d4af37]" />
            <div className="absolute bottom-3.5 left-7 w-1 h-1.5 bg-antique-gold/75 -rotate-12 rounded-xs shadow-[0_0_3px_#d4af37]" />

            {/* Buttercream Pearl Piping (Bottom rim) */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 flex justify-between px-1.5">
              {Array.from({ length: 26 }).map((_, p) => (
                <div
                  key={`p2-${p}`}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#3a1d26] via-antique-gold to-[#fff7ed] shadow-xs"
                />
              ))}
            </div>
          </div>

          {/* ===================== TIER 3 (BOTTOM TIER) ===================== */}
          {/* Bottom Row Candles: 10 Candles */}
          <div className="flex justify-center items-end gap-1.5 sm:gap-3 -mt-3.5 mb-0.5 z-10">
            {tier3Candles.map((_, i) => {
              const candleIndex = 12 + i; // 12..21
              const extinguishDelay = 0.06 + (9 - i) * 0.038;

              return (
                <div
                  key={`candle-t3-${i}`}
                  onMouseEnter={() => setHoveredCandleIndex(candleIndex)}
                  onMouseLeave={() => setHoveredCandleIndex(null)}
                >
                  <RealisticCandle
                    index={candleIndex}
                    tier={3}
                    isBlown={candlesBlown}
                    extinguishDelay={extinguishDelay}
                    windTilt={windTilt}
                    isNearCursor={hoveredCandleIndex === candleIndex}
                    isTapped={!!tappedCandles[candleIndex]}
                    onCandleClick={handleCandleClick}
                  />
                </div>
              );
            })}
          </div>

          {/* Tier 3 Cake Body (Bottom Tier - Foundation) */}
          <div className="relative w-[300px] sm:w-[410px] h-[66px] sm:h-[76px] rounded-t-2xl shadow-2xl flex flex-col items-center justify-center border-x border-antique-gold/20 z-5 overflow-hidden bg-gradient-to-r from-[#0d0509] via-[#1e0d13] via-[#2d121c] via-[#1e0d13] to-[#0d0509]">
            {/* Glossy top deck ledge */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-antique-gold/25 via-white/5 to-transparent" />

            {/* Scalloped Chocolate Ganache Drip Border */}
            <svg
              className="absolute top-0 inset-x-0 w-full h-4 sm:h-5 text-[#13050b] fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 L 100,0 L 100,5 C 97,11 95,17 92,17 C 89,17 87,6 84,5 C 81,5 79,18 76,18 C 73,18 71,6 68,5 C 65,5 63,14 60,14 C 57,14 55,6 52,5 C 49,5 47,19 44,19 C 41,19 39,6 36,5 C 33,5 31,15 28,15 C 25,15 23,6 20,5 C 17,5 15,18 12,18 C 9,18 7,6 4,5 C 2,5 1,5 0,5 Z" />
            </svg>

            {/* Inscription: CHAPTER XXII · BELLA */}
            <div className="relative z-10 flex flex-col items-center mt-1 px-4">
              <span className="font-sans text-[10px] sm:text-xs tracking-[0.32em] uppercase text-antique-gold/90 font-medium drop-shadow-sm">
                Chapter XXII · Bella
              </span>
              <div className="w-24 sm:w-36 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/45 to-transparent mt-1" />
            </div>

            {/* Edible Gold Leaf Flecks */}
            <div className="absolute top-5 left-10 w-1.5 h-1 bg-antique-gold/70 -rotate-12 rounded-xs shadow-[0_0_3px_#d4af37]" />
            <div className="absolute top-6 right-12 w-2 h-1 bg-antique-gold/75 rotate-45 rounded-xs shadow-[0_0_3px_#d4af37]" />
            <div className="absolute bottom-4 left-1/4 w-1 h-1 bg-antique-gold/80 rotate-12 rounded-xs shadow-[0_0_3px_#d4af37]" />

            {/* Double Row of Buttercream Pearl Piping (Bottom rim) */}
            <div className="absolute bottom-0 inset-x-0 h-2 flex justify-between px-2">
              {Array.from({ length: 34 }).map((_, p) => (
                <div
                  key={`p3-${p}`}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#3a1d26] via-antique-gold to-[#fff7ed] shadow-xs"
                />
              ))}
            </div>
          </div>

          {/* ===================== CAKE STAND & PEDESTAL ===================== */}
          {/* Metallic Antique-Gold Platter with Mirror Reflection */}
          <div className="relative w-[320px] sm:w-[440px] max-w-[calc(100vw-28px)] h-4 sm:h-5 bg-gradient-to-r from-[#8c6d48] via-[#d4b896] via-[#f7ebd4] via-[#d4b896] to-[#8c6d48] rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.85)] border-t border-white/40 flex items-center justify-center">
            {/* Mirror reflection rim */}
            <div className="w-[94%] h-[60%] rounded-full bg-gradient-to-b from-[#1c1216] to-[#0a0508] opacity-90 border-t border-antique-gold/40" />
          </div>

          {/* Fluted Ornate Pedestal Stem */}
          <div className="w-24 sm:w-36 h-5 sm:h-7 bg-gradient-to-r from-[#20140e] via-[#947659] via-[#d4b896] via-[#947659] to-[#20140e] shadow-lg clip-pedestal border-x border-antique-gold/30" />

          {/* Stepped Pedestal Base Foot */}
          <div className="w-36 sm:w-52 h-3.5 sm:h-4 bg-gradient-to-r from-[#170e0a] via-[#8c6d48] via-[#d4b896] via-[#8c6d48] to-[#170e0a] rounded-b-xl shadow-2xl border-t border-antique-gold/50" />

          {/* Table Ambient Floor Drop Shadow */}
          <div className="w-[280px] sm:w-[460px] h-6 bg-black/80 blur-xl rounded-full -mt-1 pointer-events-none" />
        </div>

        {/* Action Button & Post-Wish Celebration Section */}
        {!candlesBlown ? (
          <button
            onClick={handleMakeWish}
            disabled={isWishing}
            type="button"
            className="group relative inline-flex items-center justify-center px-9 sm:px-12 py-4 bg-surface-dark border border-antique-gold/40 text-ivory font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-medium hover:bg-burgundy hover:border-antique-gold/70 transition-all duration-500 shadow-xl shadow-black/60 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isWishing ? "Blowing out..." : cake.buttonText}</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 max-w-lg mx-auto py-6"
          >
            <span className="font-serif italic text-sm tracking-[0.25em] uppercase text-antique-gold/80 block">
              {cake.afterWishMessage}
            </span>
            <p className="font-serif italic text-lg sm:text-2xl text-ivory/90 leading-relaxed font-light">
              “{cake.quote}”
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
