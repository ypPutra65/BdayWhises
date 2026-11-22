"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayData } from "@/data/birthday";

export const BirthdayCake: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [isWishing, setIsWishing] = useState<boolean>(false);
  const { cake } = birthdayData;

  const handleMakeWish = () => {
    if (candlesBlown || isWishing) return;
    setIsWishing(true);

    // Audio cue for blowing out candles (soft gentle breath synthesis)
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.8;
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
        filter.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.8);

        noise.connect(filter);
        filter.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // Audio fallback silent
    }

    // Extinguish candles smoothly
    setTimeout(() => {
      setCandlesBlown(true);
      setIsWishing(false);

      // Trigger luxury-toned confetti sequence
      const luxuryColors = ["#B99A80", "#EDE4DC", "#781E30", "#4A101D", "#D4AF37", "#FFFFFF"];

      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.65 },
        colors: luxuryColors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.1,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.7 },
          colors: luxuryColors,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.7 },
          colors: luxuryColors,
        });
      }, 350);

      setTimeout(() => {
        confetti({
          particleCount: 35,
          spread: 100,
          origin: { y: 0.4 },
          colors: ["#B99A80", "#D4AF37"],
          gravity: 0.6,
          scalar: 0.8,
        });
      }, 750);
    }, 700);
  };

  const topRowCandles = Array.from({ length: 10 });
  const bottomRowCandles = Array.from({ length: 12 });

  return (
    <section className="relative min-h-screen py-28 sm:py-36 px-4 sm:px-6 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-radial from-burgundy/40 via-oxblood/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div
        className="max-w-xl mx-auto w-full flex flex-col items-center relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Title & Instructions */}
        <div className="mb-12">
          <span className="font-serif italic text-xs sm:text-sm tracking-[0.35em] uppercase text-antique-gold/75 block mb-3">
            Chapter XXII
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-wide mb-3 font-normal">
            {cake.title}
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-ivory/65 max-w-md mx-auto">
            {cake.instructions}
          </p>
        </div>

        {/* Cake Illustration with 22 Candles */}
        <div className="relative mb-14 flex flex-col items-center select-none">
          {/* Candle Rack - Tier 1 (10 Candles) */}
          <div className="flex justify-center items-end gap-2 sm:gap-3.5 mb-0.5 z-20">
            {topRowCandles.map((_, i) => {
              const extinguishDelay = (i * 0.04).toFixed(2);

              return (
                <div key={`candle-top-${i}`} className="flex flex-col items-center relative">
                  {/* Smoke Wisp when extinguished */}
                  <AnimatePresence>
                    {candlesBlown && (
                      <motion.div
                        className="absolute -top-6 w-1 h-5 rounded-full bg-ivory/30 filter blur-[1.5px]"
                        initial={{ opacity: 0.8, y: 0, scaleX: 1 }}
                        animate={{ opacity: 0, y: -18, scaleX: 2.5 }}
                        transition={{ duration: 1.6, delay: Number(extinguishDelay) }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Flame */}
                  <div
                    className={`w-2.5 h-4 sm:w-3 sm:h-5 rounded-full transition-all duration-700 ${
                      candlesBlown
                        ? "opacity-0 scale-0 -translate-y-2 filter blur-sm"
                        : "candle-flame bg-gradient-to-t from-deep-red via-amber-400 to-yellow-100 shadow-[0_0_12px_#f59e0b]"
                    }`}
                    style={{
                      animationDelay: `${(i % 5) * 0.25}s`,
                      transitionDelay: candlesBlown ? `${extinguishDelay}s` : "0s",
                    }}
                  />
                  {/* Wick */}
                  <div className="w-[1.5px] h-2 bg-stone-600" />
                  {/* Candle Stick */}
                  <div className="w-1.5 sm:w-2 h-7 sm:h-9 bg-gradient-to-b from-antique-gold via-[#a8866d] to-burgundy rounded-t-sm shadow-md" />
                </div>
              );
            })}
          </div>

          {/* Cake Tier 1 (Upper Tier) */}
          <div className="w-[190px] sm:w-[280px] h-14 bg-gradient-to-b from-[#25181d] via-[#1c1216] to-[#140c0f] border-t-2 border-antique-gold/50 rounded-t-xl shadow-xl flex flex-col items-center justify-center relative border-x border-antique-gold/15">
            <span className="font-serif italic text-xs sm:text-sm tracking-[0.25em] text-antique-gold font-medium">
              XXII
            </span>
            <div className="w-12 h-[1px] bg-antique-gold/25 mt-0.5" />
          </div>

          {/* Candle Rack - Tier 2 (12 Candles) */}
          <div className="flex justify-center items-end gap-1 sm:gap-2.5 -mt-3.5 mb-0.5 z-20">
            {bottomRowCandles.map((_, i) => {
              const extinguishDelay = (0.15 + (11 - i) * 0.04).toFixed(2);

              return (
                <div key={`candle-bot-${i}`} className="flex flex-col items-center relative">
                  {/* Smoke Wisp when extinguished */}
                  <AnimatePresence>
                    {candlesBlown && (
                      <motion.div
                        className="absolute -top-6 w-1 h-5 rounded-full bg-ivory/30 filter blur-[1.5px]"
                        initial={{ opacity: 0.8, y: 0, scaleX: 1 }}
                        animate={{ opacity: 0, y: -18, scaleX: 2.5 }}
                        transition={{ duration: 1.6, delay: Number(extinguishDelay) }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Flame */}
                  <div
                    className={`w-2 h-3.5 sm:w-2.5 sm:h-4.5 rounded-full transition-all duration-700 ${
                      candlesBlown
                        ? "opacity-0 scale-0 -translate-y-2 filter blur-sm"
                        : "candle-flame bg-gradient-to-t from-deep-red via-amber-400 to-yellow-100 shadow-[0_0_10px_#f59e0b]"
                    }`}
                    style={{
                      animationDelay: `${(i % 4) * 0.3}s`,
                      transitionDelay: candlesBlown ? `${extinguishDelay}s` : "0s",
                    }}
                  />
                  {/* Wick */}
                  <div className="w-[1.5px] h-1.5 bg-stone-600" />
                  {/* Candle Stick */}
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-ivory via-antique-gold to-burgundy rounded-t-sm shadow-md" />
                </div>
              );
            })}
          </div>

          {/* Cake Tier 2 (Lower Tier) */}
          <div className="w-[250px] sm:w-[360px] h-18 bg-gradient-to-b from-[#1d1217] via-[#160d11] to-[#10090c] border-t-2 border-antique-gold/50 rounded-t-2xl shadow-2xl flex flex-col items-center justify-center relative border-x border-antique-gold/15 py-3">
            <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-antique-gold/75 font-medium">
              Chapter XXII · Bella
            </span>
            <div className="w-24 h-[1px] bg-antique-gold/20 mt-1" />
          </div>

          {/* Cake Stand / Plate Pedestal */}
          <div className="w-[270px] sm:w-[410px] max-w-[calc(100vw-36px)] h-4 bg-gradient-to-r from-antique-gold/40 via-antique-gold/70 to-antique-gold/40 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.8)] border-t border-white/20" />
          <div className="w-24 sm:w-36 h-3 bg-gradient-to-b from-antique-gold/50 to-[#221712] rounded-b-md shadow-md" />
        </div>

        {/* Action Button & Post-Wish Celebration Section */}
        {!candlesBlown ? (
          <button
            onClick={handleMakeWish}
            disabled={isWishing}
            type="button"
            className="group relative inline-flex items-center justify-center px-9 sm:px-12 py-4 bg-surface-dark border border-antique-gold/40 text-ivory font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-medium hover:bg-burgundy hover:border-antique-gold/70 transition-all duration-500 shadow-xl shadow-black/60 cursor-pointer"
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
